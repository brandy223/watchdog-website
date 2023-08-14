import React from "react";
import Image from "next/image";
import {MainServer} from "@/components/MainServer";
import "../styles/Navbar.css"
import {getCentralServersAndInfo} from "@/app/api/db";

export const NavBar = async () => {
    const centralServers: Map<string[], [string[], boolean]> = await getCentralServersAndInfo();

    return (
        <nav
            className="w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="navbar flex flex-wrap items-center justify-between p-4">
                <a href="/" className="flex items-center">
                    <Image src={"/BONIFAY.jpg"} alt={"Flowbite Logo"} width={50} height={50} className={"rounded-full"} />
                    <span
                        className="self-center ml-6 text-2xl text-mainWhite font-semibold whitespace-nowrap">Watchdog
                    </span>
                </a>
                <div className="flex md:order-2 flex">
                    {
                        [...centralServers.entries()].map(
                            ([key, value]) => <MainServer key={key[3]} id={`1-false-${key[3]}-0`} ip={key[0]} status={value[0]} isSocketAlive={value[1].toString()}/>
                        )
                    }
                </div>
                <div className="items-center justify-between hidden w-full md:flex bg-mainGray md:w-auto md:order-1"
                     id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-mainGray md:flex-row md:space-x-8 md:mt-0 md:border-0">
                        <li className="hover:bg-mainDarkGray">
                            <a href="/"
                               className="block py-2 pl-3 pr-4 font-family: outfit text-bold text-mainWhite hover:text-gray-300 rounded hover:-translate-y-0.5 hover:duration-300"
                               aria-current="page">Home
                            </a>
                            <hr />
                        </li>
                        <li className="hover:bg-mainDarkGray">
                            <a href="/admin"
                               className="block py-2 pl-3 pr-4 text-bold text-mainWhite rounded hover:text-gray-300 hover:-translate-y-0.5 hover:duration-300">Admin
                            </a>
                            <hr />
                        </li>
                        <li className="hover:bg-mainDarkGray">
                            <a href="/config"
                               className="block py-2 pl-3 pr-4 text-bold text-mainWhite rounded hover:text-gray-300 hover:-translate-y-0.5 hover:duration-300">Config
                            </a>
                            <hr />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
