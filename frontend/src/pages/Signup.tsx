import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN } from '@/constants/routes';

const SignupPage = () => {
  return (
    <main className="w-full h-screen">
      <section className="w-full h-full">
        <div className="w-full max-w-xl mx-auto py-12 md:py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500">Signup</h2>

          <form>
            <div className="space-y-7 py-10 md:py-16 mb-7">
              <div className="flex flex-col md:flex-row space-y-7 md:space-y-0 md:space-x-6">
                <div className="w-full md:w-6/12">
                  <label
                    htmlFor="firstname"
                    className="inline-block text-base font-semibold text-slate-500 mb-2"
                  >
                    Firstname
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="john"
                  />
                </div>
                <div className="w-full md:w-6/12">
                  <label
                    htmlFor="lastname"
                    className="inline-block text-base font-semibold text-slate-500 mb-2"
                  >
                    Lastname
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="doe"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="inline-block text-base font-semibold text-slate-500 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="johndoe"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="inline-block text-base font-semibold text-slate-500 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g, johndoe@mail.com"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="inline-block text-base font-semibold text-slate-500 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="confirm-password"
                  className="inline-block text-base font-semibold text-slate-500 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full py-2 px-3 bg-white border-2 text-slate-500 border-slate-300 shadow-lg shadow-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-white text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-lg shadow-slate-300 transition-colors hover:from-blue-500 hover:to-cyan-500"
            >
              Signup
            </button>
          </form>

          <p className="text-center text-base text-slate-500">
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
