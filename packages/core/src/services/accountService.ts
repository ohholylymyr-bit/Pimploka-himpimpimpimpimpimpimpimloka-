// packages/core/src/services/accountService.ts
import { Ledger } from "ledger/src/ledger";
import { Account } from "../entities/account";
import { v4 as uuidv4 } from "uuid";

export class AccountService {
  private ledger: Ledger;

  constructor(ledger: Ledger) {
    this.ledger = ledger;
  }

  createAccount(userId: string, type: Account["type"], iban: string): Account {
    const account: Account = {
      id: uuidv4(),
      userId,
      type,
      iban,
      createdAt: new Date()
    };

    // Tili luotu, saldo alkaa nollasta ledgerissä
    return account;
  }

  getBalance(accountId: string): number {
    return this.ledger.getBalance(accountId);
  }
}
