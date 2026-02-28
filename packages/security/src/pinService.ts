// packages/security/src/pinService.ts
import bcrypt from "bcrypt";

export class PinService {
  static async hashPin(pin: string): Promise<string> {
    if (!/^\d{6}$/.test(pin)) throw new Error("Invalid PIN format");
    return bcrypt.hash(pin, 12);
  }

  static async verifyPin(pin: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pin, hash);
  }
}
