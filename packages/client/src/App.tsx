import React from 'react';
import ROUTES from '@/constants/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const lazyLoadable = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <React.Suspense fallback="loading...">
      <Component />
    </React.Suspense>
  );
};

const router = createBrowserRouter([
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
