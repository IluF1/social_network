import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSocket = () => {
    const socket: Socket = io('http://localhost:4200');

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return socket;
};
