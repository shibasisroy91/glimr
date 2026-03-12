export interface GlimrMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  status: "sent" | "delivered" | "read";
  aiMetadata?: {
    sentiment?: "positive" | "neutral" | "negative";
    isBot?: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  isOnline: boolean;
}
