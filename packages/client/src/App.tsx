import React from 'react';
import ROUTES from '@/constants/routes';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuthStore } from './auth';

const RequireUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn = useAuthStore((state) => state.loggedIn);

  if (!loggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

const Home = () => {
  return <div>Home</div>;
};

const lazyLoadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <React.Suspense fallback="loading...">
      <Component />
    </React.Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <RequireUser>
        <Home />
      </RequireUser>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: lazyLoadable(React.lazy(() => import('@/pages/Login'))),
  },
  {
    path: ROUTES.SIGNUP,
    element: lazyLoadable(React.lazy(() => import('@/pages/Signup'))),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
