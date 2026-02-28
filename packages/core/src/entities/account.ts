// packages/core/src/entities/account.ts
export type AccountType = 'CHECKING' | 'SAVINGS' | 'COMPANY';

export interface Account {
  id: string;
  userId: string;
  type: AccountType;
  iban: string;
  createdAt: Date;
}
