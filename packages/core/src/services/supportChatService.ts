// packages/core/src/services/supportChatService.ts
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

export class SupportChatService {
  private chats: ChatMessage[] = [];

  sendMessage(userId: string, content: string) {
    const msg: ChatMessage = {
      id: uuidv4(),
      userId,
      content,
      createdAt: new Date()
    };

    this.chats.push(msg);

    // Simulation: Lähetetään adminille
    console.log(`Admin notified: New chat from ${userId}: ${content}`);
    return msg;
  }

  getChatsForUser(userId: string): ChatMessage[] {
    return this.chats.filter(c => c.userId === userId);
  }
}
