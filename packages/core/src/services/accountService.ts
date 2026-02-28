// packages/core/src/services/userService.ts
import { User } from "../entities/user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private users: User[] = [];

  async createUser(username: string, pin: string, role: User["role"] = "USER"): Promise<User> {
    if (!/^\d{10}$/.test(username)) throw new Error("Username must be 10 digits");
    if (!/^\d{6}$/.test(pin)) throw new Error("PIN must be 6 digits");

    const pinHash = await bcrypt.hash(pin, 12);

    const user: User = {
      id: uuidv4(),
      username,
      pinHash,
      role,
      createdAt: new Date(),
      twoFactorEnabled: false
    };

    this.users.push(user);
    return user;
  }

  async validatePin(user: User, pin: string): Promise<boolean> {
    return bcrypt.compare(pin, user.pinHash);
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
