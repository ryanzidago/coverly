"use client";
import { Popover } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);

  const isAuthenticated = status === "authenticated";

  return (
    <Popover className={"relative"}>
      <Popover.Button>
        <Image src={`/home.svg`} width={20} height={20} alt="home button" />
      </Popover.Button>

      <Popover.Panel className={"absolute z-10"}>
        <nav className="flex flex-col">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </nav>
      </Popover.Panel>
    </Popover>
  );
}

function SignInButton() {
  return (
    <Link href={"/api/auth/signin"} className="hover:shadow p-2 rounded">
      Sign in
    </Link>
  );
}

function SignOutButton() {
  return (
    <Link href={"/api/auth/signout"} className="hover:shadow p-2 rounded">
      Sign out
    </Link>
  );
}
