
"use client"

import {useSocketConnection, useSocketEvent} from "@/app/api/socket";

const events = require('events');
export const eventEmitter = new events.EventEmitter();

export default function SocketEventHandler() {
    const socket = useSocketConnection("http://192.168.10.44:3001");

    useSocketEvent(socket, "room_broadcast", (data: any) => {
        switch(data.messageType) {
            case 1:

                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    });
}