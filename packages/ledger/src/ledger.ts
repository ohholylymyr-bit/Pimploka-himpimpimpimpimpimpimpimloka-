// packages/ledger/src/ledger.ts
import { JournalEntry } from "./journalEntry";

export class Ledger {
  private entries: JournalEntry[] = [];

  constructor(initialEntries?: JournalEntry[]) {
    if (initialEntries) {
      this.entries = [...initialEntries];
    }
  }

  append(entry: JournalEntry) {
    this.entries.push(entry);
  }

  getEntries(): ReadonlyArray<JournalEntry> {
    return this.entries;
  }

  // Laskee tilin saldon ledgeristä
  getBalance(accountId: string): number {
    return this.entries.reduce((sum, e) => {
      if (e.accountId !== accountId) return sum;
      return sum + (e.type === "CREDIT" ? e.amount : -e.amount);
    }, 0);
  }
}
