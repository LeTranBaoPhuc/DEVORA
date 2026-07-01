import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '@/contexts/auth.context';
import { http } from '@/lib/http';
import { toast } from 'sonner';
import { BellRing } from 'lucide-react';

export interface Notification {
    id: number;
    title: string;
    message: string;
    actionUrl?: string;
    isRead: boolean;
    createdAt: string;
}

export function useNotifications() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [stompClient, setStompClient] = useState<Client | null>(null);

    // Lấy token từ localStorage hoặc cookies (tùy thuộc vào cách bạn lưu)
    // Ở đây chúng ta giả sử lấy từ api mặc định nhưng vì websocket không chạy qua axios interceptor 
    // nên ta không gửi jwt qua header ngay, mà phụ thuộc vào cookie nếu có, hoặc không bảo mật /ws endpoint.
    // Tạm thời kết nối STOMP public, và channel là /user/{userId}/queue/notifications 
    // Tuy nhiên theo config Backend, prefix là /user, và Spring WebSocket tự resolve user.
    // Nếu chưa config auth trên STOMP, ta có thể dùng channel public dạng /queue/notifications-{userId} 
    // Nhưng vì ở Backend tôi code là messagingTemplate.convertAndSendToUser(user.getId().toString(), "/queue/notifications", response)
    // Client cần subscribe vào destination: /user/{userId}/queue/notifications.

    const fetchHistory = async () => {
        try {
            const res = await http<any>('/api/notifications', { method: 'GET' });
            if (res.status === 200 && res.data) {
                setNotifications(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch notifications history", error);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
            await http<any>(`/api/notifications/${id}/read`, {
                method: 'PUT'
            });
        } catch (error) {
            console.error("Failed to mark as read", error);
            // Optional: revert optimistic update on failure
        }
    };

    useEffect(() => {
        if (!user) return;

        fetchHistory();

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            debug: (str) => {
                // console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = () => {
            console.log('STOMP Connected');
            client.subscribe(`/topic/notifications-${user.id}`, (message) => {
                if (message.body) {
                    const notification = JSON.parse(message.body) as Notification;
                    setNotifications(prev => [notification, ...prev]);
                    toast.custom((t) => (
                        <div className="bg-background border-l-4 border-primary p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(204,255,0,0.15)] w-full w-[356px] flex items-start gap-4 ring-1 ring-border relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="bg-primary/20 p-2 rounded-full text-primary shrink-0 mt-0.5">
                                <BellRing className="w-5 h-5 animate-[ring_2s_ease-in-out_infinite]" style={{ transformOrigin: 'top center' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-foreground text-[15px] leading-tight mb-1">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-snug">{notification.message}</p>
                            </div>
                            {notification.actionUrl && (
                                <button 
                                    onClick={() => {
                                        toast.dismiss(t);
                                        window.location.href = notification.actionUrl!;
                                    }}
                                    className="shrink-0 bg-primary text-primary-foreground px-3 py-1.5 rounded-md font-bold text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                >
                                    Chi tiết
                                </button>
                            )}
                            <button onClick={() => toast.dismiss(t)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    ), { duration: 8000, position: 'top-right' });
                }
            });
        };

        client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [user]);

    return { notifications, markAsRead };
}
