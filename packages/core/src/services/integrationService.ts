// packages/core/src/services/integrationService.ts
import { PaymentService } from "./paymentService";
import { LoanService } from "./loanService";
import { Ledger } from "ledger/src/ledger";

export class IntegrationService {
  constructor(private ledger: Ledger, private paymentService: PaymentService, private loanService: LoanService) {}

  executeLoanPayment(userAccountId: string, loanId: string, amount: number) {
    // Maksaa lainan käyttämällä ledger/payment service
    this.paymentService.executePayment(userAccountId, "LOAN_POOL", amount, `LoanPayment:${loanId}`);
    this.loanService.repayLoan(loanId);
  }
}
