
import { useEffect, useState } from 'react';
import io, {Socket} from 'socket.io-client';

export const useSocketConnection = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(serverUrl);

        setSocket(newSocket);
        newSocket.emit("browser_connection");

        return () => {
            newSocket.disconnect();
        };
    }, [serverUrl]);

    return socket;
};

export const useSocketEvent = (socket: Socket | null, event: string, callback: ((data: any) => void)) => {
    useEffect(() => {
        if (socket) {
            socket.on(event, callback);
        }

        return () => {
            if (socket) {
                socket.off(event, callback);
            }
        };
    }, [socket, event, callback]);
};