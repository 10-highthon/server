import { User } from "@prisma/client";

export class CreateUserDTO implements User {
  /**
   * User ID
   *
   * @example UUID
   */
  id: string;

  createdAt: Date;
}
