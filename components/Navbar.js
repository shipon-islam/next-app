import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { HiOutlineMail, HiOutlineUserCircle } from "react-icons/hi";

export default function Navbar() {
  const { data } = useSession();
  const [userToggle, setUserToggle] = useState(true);
  return (
    <header className="text-gray-600 body-font border">
      <div className="container mx-auto flex flex-wrap py-2 px-12 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Image src="/bandlogo.png" width={100} height={100} alt="logo" />
        </a>
        <nav className="md:mr-auto md:ml-12 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} legacyBehavior>
            <a className="mr-8 text-md font-medium hover:text-gray-900">Home</a>
          </Link>
          <Link href={"/gallery"} legacyBehavior>
            <a className="mr-8 text-md font-medium hover:text-gray-900">
              Gallery
            </a>
          </Link>
          <Link href={"/about"} legacyBehavior>
            <a className="mr-8 text-md font-medium hover:text-gray-900">
              About
            </a>
          </Link>
          <Link href={"/contact"} legacyBehavior>
            <a className="mr-8 text-md font-medium hover:text-gray-900">
              Contact
            </a>
          </Link>
        </nav>
        {data?.user ? (
          <div className="relative">
            <button
              className="w-fit"
              onClick={() => setUserToggle((prev) => !prev)}
            >
              <Image
                className="rounded-full border-2 object-cover w-[35px] h-[35px]"
                src={data?.user?.image || "/background.jpg"}
                width={40}
                height={40}
                alt="user"
              />
            </button>
            <div
              className={`absolute bg-gray-100 right-0 px-5 py-4 gap-y-2 flex flex-col rounded-md border ${
                userToggle && "hidden"
              }`}
            >
              <div className="capitalize">
                <HiOutlineUserCircle className="inline-block mr-1 text-xl" />
                {data.user.name}
              </div>
              <div className="flex items-center gap-x-1 capitalize ">
                <HiOutlineMail className="inline-block text-lg" />
                {data.user.email}
              </div>
              <button
                onClick={() => signOut()}
                className="w-fit hover:bg-red-200 duration-500 transition-colors pr-6 rounded-md py-1"
              >
                <BiLogOutCircle className="inline-block mr-1 text-xl" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login">
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
