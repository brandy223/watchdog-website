
"use client"

// import { useEffect, useState } from "react";
// import { eventEmitter } from "@/app/api/SocketEventHandler";
// import { useSocketConnection, useSocketEvent } from "@/app/api/socket";

type ServiceDataCellProps = {
    id: number
    name: string
    parentId: number
}

export default function ServiceDataCell({id, name, parentId}: ServiceDataCellProps) {
    // const [value, setValue] = useState<string>("X");
    // eventEmitter.on("room_broadcast", (data: any) => {
    //     console.log(data);
    //     if (data.messageType === 4 && data.serviceData.id === id) {
    //         setValue(data.value);
    //     }
    // });
    // const socket = useSocketConnection("http://192.168.10.44:3001");
    //
    // useSocketEvent(socket, "room_broadcast", (data: any) => {
    //     console.log(data);
    //     if (data.messageType === 4 && data.serviceData.id === id) {
    //         setValue(data.value);
    //     }
    // });

    return (
        <div className="category-main-field-sub-item flex flex-row w-full" id={`4-true-${id}-${parentId}`}>
            <div className="title w-full flex items-center">
                {name}
            </div>
            <div className="w-10 text-white mr-2">
                X
            </div>
        </div>
    )
}