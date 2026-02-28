// packages/ledger/src/ledger.test.ts
import { Ledger } from "./ledger";
import { createJournalEntry } from "./journalEntry";

const ledger = new Ledger();

const entry1 = createJournalEntry("1", "acc1", "CREDIT", 100);
ledger.append(entry1);

const entry2 = createJournalEntry("2", "acc1", "DEBIT", 30);
ledger.append(entry2);

console.assert(ledger.getBalance("acc1") === 70, "Balance should be 70");

console.log("Ledger test passed. Balance:", ledger.getBalance("acc1"));
