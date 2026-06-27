import { TopNav } from "@/components/layout/top-nav";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopNav />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
