import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import Page403 from './pages/Page403';
import DashboardAppPage from './pages/DashboardAppPage';
import Users from './pages/Users';
import Search from './pages/Search';
import Place from './pages/Place';
import OpinionForm from './pages/OpinionForm';
import Places from './pages/Places';
import Contact from './pages/Contact'
import ProtectedRoute from './route/ProtectedRoute';
import AdminRoute from './route/AdminRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <ProtectedRoute><DashboardAppPage /></ProtectedRoute> },
        { path: 'users', element: <AdminRoute><Users /></AdminRoute> },
        { path: 'places', element: <AdminRoute><Places /></AdminRoute> },
        { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
        { path: 'place', element: <ProtectedRoute><Place /></ProtectedRoute> },
        { path: 'opinionForm', element: <ProtectedRoute><OpinionForm /></ProtectedRoute> },
        { path: 'search', element: <ProtectedRoute><Search /></ProtectedRoute> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
