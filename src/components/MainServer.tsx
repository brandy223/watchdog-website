
"use client"

import {useEffect, useState} from "react";
import {componentsData} from "@/app/api/SocketEventHandler";

type MainServerProps = {
    id: string
    ip: string
    status: string[]
    isSocketAlive: string
}

export const MainServer = ({id, ip, status, isSocketAlive}: MainServerProps) => {
    const [color , setColor] = useState("border-errorRed");

    useEffect(() => {
        setInterval(() => {
            if (!componentsData.get(id)) {
                const finalStatus = status;
                finalStatus.push(isSocketAlive);
                componentsData.set(id, finalStatus);
            }
            switch (((componentsData.get(id) ?? ["false"])[0])) {
                case "OK":
                    if ((componentsData.get(id) ?? ["false"])[((componentsData.get(id) ?? ["false"]).length) - 1] === "false") {
                        setColor("border-warningYellow");
                        break;
                    }
                    setColor("border-validGreen");
                    break;
                case "KO":
                    setColor("border-errorRed");
                    break;
                default:
                    setColor("border-errorRed");
                    break;
            }
        }, 5000);
    }, [id]);

    return (
        <a className={"text-mainWhite font-medium rounded-full border-2 text-sm px-4 py-2 text-center mr-3 md:mr-0 " + color}>
            {ip}
        </a>
    )
}