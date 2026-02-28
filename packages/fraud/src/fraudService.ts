// packages/fraud/src/fraudService.ts
import { JournalEntry } from "ledger/src/journalEntry";

export class FraudService {
  static checkTransaction(entry: JournalEntry): boolean {
    // Skeleton: esimerkki rule
    if (entry.amount > 1000) {
      console.warn("Potential fraud detected:", entry);
      return false;
    }
    return true;
  }
}
