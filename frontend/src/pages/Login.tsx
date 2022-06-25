import React from 'react';

const LoginPage = () => {
  return (
    <main className="w-full h-screen relative isolate overflow-hidden">
      <section className="w-full h-full">
        <div className="w-full max-w-xl mx-auto py-12 lg:py-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500">Login</h2>

          <form>
            <div className="space-y-7 py-20 mb-7">
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
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-white text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md shadow-lg shadow-slate-300 transition-colors hover:from-blue-500 hover:to-cyan-500"
            >
              Login
            </button>
          </form>

          <p className="text-center text-base text-slate-500">
            <strong>Don't have an Account?</strong>
            <a href="#" className="ml-2 text-base text-blue-500 font-bold">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
