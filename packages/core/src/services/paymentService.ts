// packages/core/src/services/paymentService.ts
import { Ledger } from "ledger/src/ledger";
import { JournalEntry, createJournalEntry } from "ledger/src/journalEntry";
import { FraudService } from "fraud/src/fraudService";
import { v4 as uuidv4 } from "uuid";

export class PaymentService {
  constructor(private ledger: Ledger) {}

  executePayment(fromAccount: string, toAccount: string, amount: number, reference?: string) {
    const debitEntry: JournalEntry = createJournalEntry(uuidv4(), fromAccount, "DEBIT", amount, reference);
    const creditEntry: JournalEntry = createJournalEntry(uuidv4(), toAccount, "CREDIT", amount, reference);

    // Fraud check
    if (!FraudService.checkTransaction(debitEntry) || !FraudService.checkTransaction(creditEntry)) {
      throw new Error("Payment flagged as fraudulent");
    }

    // Append to ledger
    this.ledger.append(debitEntry);
    this.ledger.append(creditEntry);

    return { success: true, debitEntry, creditEntry };
  }
}
