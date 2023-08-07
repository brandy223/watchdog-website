
"use client"

import {useEffect, useState} from "react";
import { componentsData } from "@/app/api/SocketEventHandler";

type ServiceDataCellProps = {
    id: string
    name: string
}

export default function ServiceDataCell({id, name}: ServiceDataCellProps) {
    const [value, setValue] = useState<string>("X");

    useEffect(() => {
        setInterval(() => {
            if (!componentsData.has(id)) {
                componentsData.set(id, [value]);
                return;
            }
            if ((componentsData.get(id) ?? ["false"])[0] !== value) {
                setValue((componentsData.get(id) ?? ["false"])[0]);
            }
        }, 1000);
    }, [id]);

    return (
        <div className="category-main-field-sub-item flex flex-row w-full">
            <div className="title w-full flex items-center">
                {name}
            </div>
            <div className="w-10 text-white mr-2">
                {value}
            </div>
        </div>
    )
}