
"use client"

import {useSocketConnection, useSocketEvent} from "@/app/api/socket";

export const componentsData = new Map<string, string>;

export default function SocketEventHandler() {
    const socket = useSocketConnection("http://localhost:3001");
    useSocketEvent(socket, "room_broadcast", (data: any) => {
        if (data === null) return;

        let componentId: string = "";
        switch(data.messageType) {
            case 1:
                componentId = `1-false-${data.server.id}-0`;
                if (!componentsData.has(componentId)) {
                    componentsData.set(componentId, data.status);
                    return;
                }
                if (componentsData.get(componentId) !== data.status) {
                    componentsData.set(componentId, data.status);
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
                    componentsData.set(componentId, data.value);
                    return;
                }
                if (componentsData.get(componentId) !== data.value) {
                    componentsData.set(componentId, data.value);
                }
                return;
            default:
                break;
        }
        console.log(componentId);
        console.log(componentsData);

        if (!componentsData.has(componentId)) {
            componentsData.set(componentId, data.status[0]);
            return;
        }
        if (componentsData.get(componentId) !== data.status[0]) {
            componentsData.set(componentId, data.status[0]);
        }
    });
}