import React from "react";
import Image from "next/image";
import {MainServer} from "@/components/MainServer";

export const NavBar = ({ className }) => {
    return (

        <nav
            className="bg-mainGray fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between p-4">
                <a href="/" className="flex items-center">
                    <Image src={"https://flowbite.com/docs/images/logo.svg" } alt={"Flowbite Logo"} width={30} height={30} />
                    <span
                        className="self-center ml-6 text-2xl text-mainWhite font-semibold whitespace-nowrap">Watchdog
                    </span>
                </a>
                <div className="flex md:order-2 flex">
                    <MainServer />
                </div>
                <div className="items-center justify-between hidden w-full md:flex bg-mainGray md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-mainGray md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li className="active:border-solid active:border-b-2 active:border-gray-300">
                            <a href="/"
                               className="block py-2 pl-3 pr-4 font-family: outfit text-bold text-mainWhite hover:text-gray-400 rounded"
                               aria-current="page">Home
                            </a>
                            <hr />
                        </li>
                        <li className="active:border-solid active:border-b-2 active:border-gray-300">
                            <a href="/admin"
                               className="block py-2 pl-3 pr-4 text-bold text-mainWhite rounded hover:text-gray-400">Admin
                            </a>
                            <hr />
                        </li>
                        <li>
                            <a href="/config"
                               className="block py-2 pl-3 pr-4 text-bold text-mainWhite rounded hover:text-gray-400">Config
                            </a>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
