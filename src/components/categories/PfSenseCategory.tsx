
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
        <div className={"category-main-field-item w-full flex flex-col justify-center items-center border-4 border-solid border-" + color}>
            <div className="category-main-field-item-title">{ip}</div>
            <div className="category-main-field flex flex-col">
                {pfSenseServices.map(
                    (pfSenseService: PfSenseServices) =>
                        <PfSenseServiceCell
                            key={pfSenseService.id} id={`3-true-${pfSenseService.id}-${id.split("-")[2]}`} name={pfSenseService.name} pfSenseRequestId={pfSenseService.pfSenseRequestId}
                        />
                )}
            </div>
        </div>
    )
}