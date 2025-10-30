import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";

async function Header() {
  return (
    <header className="bg-linear-to-r from-blue-300 to-purple-400 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-3">
        <Link href="/" className="text-2xl font-extrabold group cursor-pointer">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-700 drop-shadow-md group-hover:from-blue-400 group-hover:to-blue-600">
            Auth
          </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-purple-700 drop-shadow-md group-hover:from-purple-400 group-hover:to-purple-600">
            App
          </span>
        </Link>
        <nav>
          <ul className="flex items-center justify-between  gap-4 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>

            <SignedOut>
              <SignInButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium px-4 py-1 sm:px-5 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium px-4 py-1 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
