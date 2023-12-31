
"use client"

import {useSocketConnection, useSocketEvent} from "@/app/api/socket";
import {compareArrays} from "@/app/api/utils";

export const componentsData = new Map<string, string[]>;

type SocketEventHandlerProps = {
    serverIp: string
    serverPort: string
}

export default function SocketEventHandler({serverIp, serverPort}: SocketEventHandlerProps) {
    const socket = useSocketConnection(`http://${serverIp}:${serverPort}`);
    useSocketEvent(socket, "room_broadcast", async (data: any) => {
        if (data === null) return;

        let componentId: string = "";
        switch(data.messageType) {
            case 1:
                componentId = `1-false-${data.server.id}-${data.serverType}`;
                let stringValues: string[];
                if (!componentsData.has(componentId)) {
                    stringValues = [data.status];
                    data.pingInfo.map((data: string) => stringValues.push(data));
                    componentsData.set(componentId, stringValues);
                    return;
                }
                if ((componentsData.get(componentId) ?? [""])[0] !== data.status) {
                    stringValues = [data.status];
                    data.pingInfo.map((data: string) => stringValues.push(data));
                    componentsData.set(componentId, stringValues);
                }
                return;
            case 2:
                componentId = `2-true-${data.service.id}-${data.server.id}`;
                break;
            case 3:
                componentId = `3-true-${data.pfSenseService.id}-${data.pfSense.id}`;
                console.log(componentId);
                console.log(data);
                break;
            case 4:
                componentId = `4-true-${data.serviceData.id}-${data.service.id}`;
                if (!componentsData.has(componentId)) {
                    componentsData.set(componentId, [data.value]);
                    return;
                }
                if (componentsData.get(componentId) !== data.value) {
                    componentsData.set(componentId, [data.value]);
                }
                return;
            default:
                break;
        }

        if (!componentsData.has(componentId)) {
            componentsData.set(componentId, data.status);
            return;
        }
        if (!(await compareArrays(componentsData.get(componentId) ?? [], data.status))) {
            componentsData.set(componentId, data.status);
        }
    });

    return (
        <>
        </>
    )
}