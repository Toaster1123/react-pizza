import { Header } from '../components/Header.tsx';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
