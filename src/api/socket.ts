import { useEffect, useState } from 'react';
import io, {Socket} from 'socket.io-client';

export const useSocketConnection = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(serverUrl);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [serverUrl]);

    return socket;
};

export const useSocketEvent = (socket: Socket | null, event: string, callback: Function) => {
    useEffect(() => {
        if (socket) {
            socket.on(event, (data: any) => callback(data));
        }

        return () => {
            if (socket) {
                socket.off(event, (data: any) => callback(data));
            }
        };
    }, [socket, event, callback]);
};
