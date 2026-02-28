// packages/core/src/entities/companyAccount.ts
import { Account } from "./account";

export interface CompanyAccount extends Account {
  companyName: string;
  employeeIds: string[];
}
