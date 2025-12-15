'use client'

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();


  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="bg-neutral text-neutral-content shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link
            href="/"
            className="text-2xl font-bold hover:text-primary transition-colors"
          >
            Scrabble
          </Link>

          <div className="hidden md:flex gap-4">
            {!user && (
              <>
                <Link
                  href="/user/signin"
                  className="btn btn-primary btn-sm text-white shadow-md hover:shadow-lg hover:bg-primary-focus transition-all"
                >
                  Sign in
                </Link>
                <Link
                  href="/user/register"
                  className="btn btn-primary btn-sm text-white shadow-md hover:shadow-lg hover:bg-primary-focus transition-all"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  href="/game"
                  className="btn btn-ghost btn-sm hover:bg-base-100 transition-colors"
                >
                  Game
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm cursor-pointer hover:bg-error-focus transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
            {/*mobilna wersja*/}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-square">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-neutral rounded-box w-40"
            >
              {!user && (
                <>
                  <li>
                    <Link href="/user/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link href="/user/register">Register</Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <Link href="/protected">Game</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
}
