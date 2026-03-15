import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/useChatStore';
import { GlimrMessage } from '@glimr/shared';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const addMessage = useChatStore(state => state.addMessage);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('message', (message: GlimrMessage) => {
      addMessage(message);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [addMessage]);

  const sendMessage = (text: string) => {
    const newMessage: GlimrMessage = {
      id: Math.random().toString(36).substring(7),
      senderId: 'me',
      text,
      timestamp: Date.now(),
      status: 'sent',
    };

    socketRef.current?.emit('message', newMessage);
    addMessage(newMessage);
  };

  return { sendMessage };
};
