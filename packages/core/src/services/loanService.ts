// packages/core/src/services/loanService.ts
import { v4 as uuidv4 } from "uuid";

export type LoanStatus = 'ACTIVE' | 'PAID';

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  status: LoanStatus;
  createdAt: Date;
}

export class LoanService {
  private loans: Loan[] = [];

  createLoan(userId: string, amount: number): Loan {
    if (amount > 20) throw new Error("Max loan amount 20€");

    const loan: Loan = {
      id: uuidv4(),
      userId,
      amount,
      status: 'ACTIVE',
      createdAt: new Date()
    };

    this.loans.push(loan);
    return loan;
  }

  repayLoan(loanId: string) {
    const loan = this.loans.find(l => l.id === loanId);
    if (!loan) throw new Error("Loan not found");
    loan.status = 'PAID';
  }

  getLoans(userId: string): Loan[] {
    return this.loans.filter(l => l.userId === userId);
  }
}
