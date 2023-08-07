import React from "react";
import Image from "next/image";
import {MainServer} from "@/components/MainServer";
import "../styles/Navbar.css"
import {Servers} from "@prisma/client";
import {prisma} from "@/app/api/db";
import {ping} from "@/utils";
import {componentsData} from "@/app/api/SocketEventHandler";

/**
 * Test connection with server socket
 * @param {string} ip
 * @param {number} port
 * @returns {Promise<boolean>} True if the connection is established, false otherwise
 */
export function testConnectionToSocket (ip: string, port: number) : Promise<boolean> {
    const socket = require('socket.io-client')(`http://${ip}:${port}`);
    return new Promise((resolve, reject): void => {
        socket.on('connect', (): void => {
            socket.emit("test_connection", "OK");
        });
        socket.on("test_connection_ack", (message: string): void => {
            resolve(true);
            socket.disconnect();
        });
        socket.on('connect_error', (): void => {
            resolve(false);
            socket.disconnect();
        });
    });
}

/**
 * Returns an array containing centralServers and their info (IP Address, ping info)
 * @returns {Promise<[string[]]>} The array containing centralServers and their info
 */
export async function getCentralServersAndInfo(): Promise<[string[]]> {
    "use server"

    const centralServersInfo: [string[]] = [];
    const centralServers: Servers[] = await prisma.servers.findMany({ where: { type: "Central" }});
    for (const server of centralServers) {
        const info: string[] = await ping(server.ipAddr);
        if (server.port !== null) centralServersInfo.push([server.id.toString(), server.ipAddr, (info.join("-")), (await testConnectionToSocket(server.ipAddr, server.port)).toString()]);
    }
    return centralServersInfo;
}

export const NavBar = async () => {
    const centralServers: [string[]] = await getCentralServersAndInfo();

    return (
        <nav
            className="w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="navbar flex flex-wrap items-center justify-between p-4">
                <a href="/" className="flex items-center">
                    <Image src={"https://flowbite.com/docs/images/logo.svg" } alt={"Flowbite Logo"} width={30} height={30} />
                    <span
                        className="self-center ml-6 text-2xl text-mainWhite font-semibold whitespace-nowrap">Watchdog
                    </span>
                </a>
                <div className="flex md:order-2 flex">
                {centralServers.map(
                    (centralServer: string[]) => <MainServer key={centralServer[0]} id={`1-false-${centralServer[0]}-2`} ip={centralServer[1]} status={(centralServer[2] ?? "false").split("-")} isSocketAlive={centralServer[3]}/>
                )}
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
