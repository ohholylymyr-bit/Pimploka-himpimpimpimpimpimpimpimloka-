// apps/api/src/index.ts
import * as functions from "firebase-functions";
import { UserService } from "core/src/services/userService";
import { Ledger } from "ledger/src/ledger";
import { AccountService } from "core/src/services/accountService";

const ledger = new Ledger();
const accountService = new AccountService(ledger);
const userService = new UserService();

export const createUser = functions.https.onCall(async (data, context) => {
  const { username, pin } = data;
  try {
    const user = await userService.createUser(username, pin);
    return { success: true, userId: user.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});

export const getBalance = functions.https.onCall((data, context) => {
  const { accountId } = data;
  try {
    const balance = accountService.getBalance(accountId);
    return { success: true, balance };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});
