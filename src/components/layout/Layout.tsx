import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export function Layout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-50">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
