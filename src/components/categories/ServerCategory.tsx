
"use client"

import ServerServiceCell from "@/components/cells/ServerServiceCell";
import {Services} from "@prisma/client";
import {useEffect, useState} from "react";
import {componentsData} from "@/app/api/SocketEventHandler";

type ServerCategoryProps = {
    id: string
    ip: string
    services: Services[]
}

export default function ServerCategory({id, ip, services}: ServerCategoryProps) {
    const [ color, setColor ] = useState<string>("errorRed");

    useEffect(() => {
        setInterval(() => {
            switch(componentsData.get(id) ?? "KO") {
                case "OK":
                    setColor("validGreen");
                    break;
                case "KO":
                    setColor("errorRed");
                    break;
                case "PENDING":
                    setColor("warningYellow");
                    break;
                default:
                    break;
            }
        }, 5000);
        // TODO: When status KO, need to change state of all services to KO
    });

    return (
        <div className={"category-main-field-item w-full flex flex-col justify-center items-center border-4 border-solid border-" + color}>
            <div className="category-main-field-item-title">{ip}</div>
            <div className="category-main-field flex flex-col">
                {services.map(
                    (service: Services) => <ServerServiceCell key={service.id} id={`2-true-${service.id}-${id.split("-")[2]}`} name={service.name} />
                )}
            </div>
        </div>
    )
}