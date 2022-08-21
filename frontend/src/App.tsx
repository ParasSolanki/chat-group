import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LOGIN, SIGNUP } from '@/constants/routes';

const LoginPage = React.lazy(() => import('@/pages/Login'));
const SignupPage = React.lazy(() => import('@/pages/Signup'));

function App() {
  return (
    <React.Suspense fallback="loading...">
      <Routes>
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={SIGNUP} element={<SignupPage />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
