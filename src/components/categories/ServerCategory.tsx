
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
    const [ color, setColor ] = useState<string>("border-errorRed");
    const [ isHovering, setIsHovered ] = useState<boolean>(false);
    const onMouseEnter = () => {
        setIsHovered(true);
    }
    const onMouseLeave = () => {
        setIsHovered(false);
    }

    useEffect(() => {
        setInterval(() => {
            switch((componentsData.get(id) ?? ["KO"])[0]) {
                case "OK":
                    setColor("border-validGreen");
                    break;
                case "KO":
                    setColor("border-errorRed");
                    const servicesIdString: string[] = [`2-true-", "-${id.split("-")[2]}`];
                    for (const [ key, value] of componentsData) {
                        if (key.startsWith(servicesIdString[0]) && key.endsWith(servicesIdString[1])) {
                            componentsData.set(key, ["false"]);
                        }
                    }
                    break;
                case "PENDING":
                    setColor("border-warningYellow");
                    break;
                default:
                    break;
            }
        }, 5000);
        // TODO: When status KO, need to change state of all services to KO
    }, [id]);

    return (
        <div className={"category-main-field-item h-fit flex flex-col flex-grow justify-center items-center border-4 border-solid " + color}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
        >
            <div className="category-main-field-item-title truncate">{ip}</div>
            <div className="category-main-field flex flex-col">
                {!color.includes("border-errorRed") &&
                    services.map(
                    (service: Services) => <ServerServiceCell
                        key={service.id}
                        id={`2-true-${service.id}-${id.split("-")[2]}`}
                        name={service.name}
                        isHovering={isHovering}
                    />
                )}
            </div>
        </div>
    )
}