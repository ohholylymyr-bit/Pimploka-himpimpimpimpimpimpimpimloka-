// packages/security/src/pinRotationService.ts
import { User } from "core/src/entities/user";
import bcrypt from "bcrypt";

export class PinRotationService {
  static async changePin(user: User, newPin: string): Promise<void> {
    if (!/^\d{6}$/.test(newPin)) throw new Error("PIN must be 6 digits");
    user.pinHash = await bcrypt.hash(newPin, 12);
  }
}
