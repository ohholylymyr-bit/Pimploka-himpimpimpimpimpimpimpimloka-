// packages/core/src/services/cardService.ts
import { v4 as uuidv4 } from "uuid";

export interface Card {
  id: string;
  accountId: string;
  cardNumber: string;
  pin: string; // for NFC/online payments
  holderName: string;
  expiry: Date;
}

export class CardService {
  private cards: Card[] = [];

  issueCard(accountId: string, holderName: string): Card {
    const card: Card = {
      id: uuidv4(),
      accountId,
      cardNumber: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
      pin: Math.floor(100000 + Math.random() * 900000).toString(),
      holderName,
      expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 3))
    };

    this.cards.push(card);
    return card;
  }

  validateCard(cardNumber: string, pin: string): boolean {
    const card = this.cards.find(c => c.cardNumber === cardNumber);
    return card?.pin === pin ?? false;
  }
}
