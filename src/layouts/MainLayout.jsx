import { Header } from '../components/Header';
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
