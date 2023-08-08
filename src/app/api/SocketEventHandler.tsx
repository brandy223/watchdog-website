
"use client"

import {useSocketConnection, useSocketEvent} from "@/app/api/socket";
import {compareArrays} from "@/utils";

export const componentsData = new Map<string, string[]>;

export default function SocketEventHandler() {
    // TODO: Replace by db value
    const socket = useSocketConnection("http://192.168.10.44:3001");
    useSocketEvent(socket, "room_broadcast", async (data: any) => {
        if (data === null) return;
        console.log(data);

        let componentId: string = "";
        switch(data.messageType) {
            case 1:
                componentId = `1-false-${data.server.id}-0`;
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