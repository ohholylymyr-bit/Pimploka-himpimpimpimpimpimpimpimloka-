// packages/core/src/services/companyService.ts
import { CompanyAccount } from "../entities/companyAccount";
import { v4 as uuidv4 } from "uuid";

export class CompanyService {
  private companies: CompanyAccount[] = [];

  createCompanyAccount(companyName: string, employeeIds: string[]): CompanyAccount {
    const company: CompanyAccount = {
      id: uuidv4(),
      userId: uuidv4(),
      type: "COMPANY",
      iban: `FI${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      createdAt: new Date(),
      companyName,
      employeeIds
    };

    this.companies.push(company);
    return company;
  }

  getCompanyById(id: string): CompanyAccount | undefined {
    return this.companies.find(c => c.id === id);
  }
}
