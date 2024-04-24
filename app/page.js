"use client";

import { useUserAuth } from "./todo-list/_utils/auth-context";

export default function Home() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="w-full text-center text-4xl font-bold mb-8 bg-gradient-to-r from-yellow-600 via-lime-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Welcome to To-do List
        </h1>
        <div className="w-full inline-flex justify-center text-lg">
          {user ? (
            <div className="w-full mt-10 grid grid-rows-3 text-center gap-10">
              <p className="w-full ">
                Signed in as :{" "}
                <span className="ml-4 font-bold text-cyan-900">
                  {user.email}
                </span>
              </p>
              <div className="w-full grid grid-cols-2 gap-4">
                <a
                  className="p-4 bg-emerald-100 rounded-md text-black text-lg font-bold text-cyan-900 hover:opacity-90"
                  href="/todo-list"
                >
                  Continue to your To-do List
                </a>
                <button
                  className="p-4 bg-emerald-100 rounded-md text-black text-lg font-bold text-cyan-900 hover:opacity-90"
                  onClick={firebaseSignOut}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <button
              className="p-4 bg-emerald-100 rounded-md text-black text-lg font-bold text-cyan-900 hover:opacity-90"
              onClick={gitHubSignIn}
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
