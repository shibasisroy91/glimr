import { create } from 'zustand';
import { GlimrMessage } from '@glimr/shared';

interface ChatState {
  messages: GlimrMessage[];
  isTyping: boolean;
  addMessage: (message: GlimrMessage) => void;
  setMessages: (messages: GlimrMessage[]) => void;
  setTyping: (status: boolean) => void;
}

export const useChatStore = create<ChatState>(set => ({
  messages: [],
  isTyping: false,

  addMessage: message =>
    set(state => ({
      messages: [...state.messages, message],
    })),

  setMessages: messages => set({ messages }),

  setTyping: status => set({ isTyping: status }),
}));
