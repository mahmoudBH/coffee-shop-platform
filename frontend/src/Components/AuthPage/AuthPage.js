import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="font-nunito hero-text font-black text-black text-2xl lg:text-3xl mb-4 text-center">
          {isLogin ? "Login" : "Signup"} to <span className="text-orange-400">Restoran</span>
        </h1>
        <form>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your last name"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-bold shadow-lg bg-orange-400 px-4 py-2 hover:bg-orange-500 rounded-lg focus:outline-none"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            className="text-orange-400 font-bold hover:underline ml-1"
            onClick={toggleForm}
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
