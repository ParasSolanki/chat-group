import React, { useRef } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LOGIN } from '@/constants/routes';

const inputClasses =
  'appearance-none relative block w-full px-3 py-2 text-base placeholder-gray-500 text-gray-900 rounded-md ring-1 shadow ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500';
const labelClasses = 'inline-block text-base font-semibold text-slate-500 mb-1';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl bg-white p-10 shadow-lg rounded-md mt-10"
    >
      <div className="space-y-5">
        <div className="w-full ">
          <label htmlFor="firstname" className={labelClasses}>
            Firstname
          </label>
          <input
            id="firstname"
            type="text"
            {...register('firstName', { required: 'Firstname is required' })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.firstName?.type,
            })}
            placeholder="john"
          />
          {errors.firstName?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.firstName?.message}
            </span>
          )}
        </div>
        <div className="w-full ">
          <label htmlFor="lastname" className={labelClasses}>
            Lastname
          </label>
          <input
            id="lastname"
            type="text"
            {...register('lastName', { required: 'Lastname is required' })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.lastName?.type,
            })}
            placeholder="doe"
          />
          {errors.lastName?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.lastName?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="username" className={labelClasses}>
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.username?.type,
            })}
            placeholder="johndoe"
          />
          {errors.username?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.username?.message}
            </span>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
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
        <div className="w-full">
          <label htmlFor="confirm-password" className={labelClasses}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            {...register('confirmPassword', {
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
            className={classNames(inputClasses, {
              '!ring-red-500 focus:ring-red-500': errors.confirmPassword?.type,
            })}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          {errors.confirmPassword?.type && (
            <span className="text-red-500 inline-block mt-1">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent shadow-md font-semibold rounded-md mt-10 text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
      >
        Signup
      </button>
    </form>
  );
};

const SignupPage = () => {
  return (
    <main className="w-full h-screen">
      <section className="w-full h-full">
        <div className="w-full max-w-xl mx-auto py-12 md:py-16 px-4">
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            Signup
          </h2>

          <SignupForm />

          <p className="text-center text-base text-slate-500 mt-10">
            <strong>Already have an Account?</strong>
            <Link to={LOGIN} className="ml-2 text-base text-blue-500 font-bold">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
