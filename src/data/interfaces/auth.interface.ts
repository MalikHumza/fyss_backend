import { Roles } from "@prisma/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Roles | string;
}
