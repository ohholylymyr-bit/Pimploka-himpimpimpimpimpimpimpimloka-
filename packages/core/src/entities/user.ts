// packages/core/src/entities/user.ts
export interface User {
  id: string;
  username: string;    // 10-numeroa
  pinHash: string;     // bcrypt hash
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  twoFactorEnabled: boolean;
}
