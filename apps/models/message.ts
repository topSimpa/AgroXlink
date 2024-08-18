import { Timestamp } from "firebase/firestore";

export interface Message {
    id?: string;
    chatId: string;
    senderId: string;
    text?: string; 
    attachmentUrl?: string;
    timestamp?: Timestamp;
  }