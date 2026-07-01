import { useState, useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '@/contexts/auth.context';
import { http } from '@/lib/http';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
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
                    toast.info(notification.title, {
                        description: notification.message,
                        action: notification.actionUrl ? {
                            label: "Xem",
                            onClick: () => {
                                markAsRead(notification.id);
                                router.push(notification.actionUrl!);
                            }
                        } : undefined,
                    });
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
