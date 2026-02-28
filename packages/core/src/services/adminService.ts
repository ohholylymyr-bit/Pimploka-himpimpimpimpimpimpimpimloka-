// packages/core/src/services/adminService.ts
import { UserService } from "./userService";
import { CompanyService } from "./companyService";

export class AdminService {
  constructor(private userService: UserService, private companyService: CompanyService) {}

  // Lisää rahaa käyttäjien tileille (ledger append)
  addFunds(userId: string, amount: number, ledger: any) {
    const accounts = ledger.getEntries().filter((e: any) => e.accountId.startsWith(userId));
    if (accounts.length === 0) throw new Error("User has no accounts");

    accounts.forEach((acc: any) => {
      ledger.append({
        id: crypto.randomUUID(),
        accountId: acc.accountId,
        type: "CREDIT",
        amount,
        createdAt: new Date(),
        reference: "ADMIN_TOPUP"
      });
    });
  }

  listAllUsers() {
    return this.userService;
  }

  listAllCompanies() {
    return this.companyService;
  }
}
