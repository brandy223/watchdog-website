
"use client"

import {PfSenseServices} from "@prisma/client";
import PfSenseServiceCell from "@/components/cells/PfSenseServiceCell";
import {useEffect, useState} from "react";
import {componentsData} from "@/app/api/SocketEventHandler";

type PfSenseCategoryProps = {
    id: string
    ip: string
    pfSenseServices: PfSenseServices[]
}

export default function PfSenseCategory({id, ip, pfSenseServices}: PfSenseCategoryProps) {
    const [ color, setColor ] = useState<string>("errorRed");
    const [ isHovering, setIsHovered ] = useState<boolean>(false);
    const onMouseEnter = () => {
        setIsHovered(true);
    }
    const onMouseLeave = () => {
        setIsHovered(false);
    }

    useEffect(() => {
        setInterval(() => {
            switch((componentsData.get(id) ?? ["Ko"])[0]) {
                case "OK":
                    setColor("validGreen");
                    break;
                case "KO":
                    setColor("errorRed");
                    const pfSenseServicesIdString: string[] = [`3-true-", "-${id.split("-")[2]}`];
                    for (const [ key, value] of componentsData) {
                        if (key.startsWith(pfSenseServicesIdString[0]) && key.endsWith(pfSenseServicesIdString[1])) {
                            componentsData.set(key, ["stopped"]);
                        }
                    }
                    break;
                case "PENDING":
                    setColor("warningYellow");
                    break;
                default:
                    break;
            }
        }, 5000);
        // TODO: When status KO, need to change state of all services to KO
    }, [id]);

    return (
        <div className={"category-main-field-item h-fit flex flex-col justify-center items-center border-4 border-solid border-" + color}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="category-main-field-item-title truncate">{ip}</div>
            <div className="category-main-field flex flex-col">
                {!color.includes("errorRed") &&
                    pfSenseServices.map(
                    (pfSenseService: PfSenseServices) =>
                        <PfSenseServiceCell
                            key={pfSenseService.id}
                            id={`3-true-${pfSenseService.id}-${id.split("-")[2]}`}
                            name={pfSenseService.name}
                            pfSenseRequestId={pfSenseService.pfSenseRequestId}
                            isHovering={isHovering}
                        />
                )}
            </div>
        </div>
    )
}