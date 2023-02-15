import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import { useAuthStore } from '@/auth';

const inputClasses =
  'appearance-none relative block w-full px-3 py-2 text-base placeholder-gray-500 text-gray-900 rounded-md ring-1 shadow ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500';
const labelClasses = 'inline-block text-base font-semibold text-slate-500 mb-1';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const jsonData = await res.json();

      if (jsonData.success) {
        login(jsonData.user.firstName);
        navigate(ROUTES.HOME);
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl bg-white p-10 shadow-lg rounded-md mt-10"
    >
      <div className="space-y-5">
        <div className="w-full">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="text"
            autoComplete="off"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Please enter a valid email',
              },
            })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.email?.type,
            })}
            placeholder="e.g, johndoe@mail.com"
          />
          {errors.email?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="password" className={labelClasses}>
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="off"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.password?.type,
            })}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          {errors.password?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.password?.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent shadow-md font-semibold rounded-md mt-10 text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
      >
        Login
      </button>
    </form>
  );
};

const LoginPage = () => {
  return (
    <main className="w-full h-screen relative isolate overflow-hidden">
      <section className="w-full h-full">
        <div className="w-full max-w-xl mx-auto py-12 lg:py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500">Login</h2>

          <LoginForm />

          <p className="text-center text-base text-slate-500 mt-10">
            <strong>Don't have an Account?</strong>
            <Link to={ROUTES.SIGNUP} className="ml-2 text-base text-blue-500 font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
