// packages/ledger/src/journalEntry.ts
export type JournalEntryType = 'DEBIT' | 'CREDIT';

export interface JournalEntry {
  id: string;                   // Unique ID
  accountId: string;            // Tili mihin entry kohdistuu
  type: JournalEntryType;        // DEBIT/CREDIT
  amount: number;                // Summa
  createdAt: Date;               // Ajankohta
  reference?: string;            // Viite / maksun tunniste
}

export function createJournalEntry(
  id: string,
  accountId: string,
  type: JournalEntryType,
  amount: number,
  reference?: string
): JournalEntry {
  return {
    id,
    accountId,
    type,
    amount,
    createdAt: new Date(),
    reference
  };
}
