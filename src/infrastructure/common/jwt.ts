import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  firm_id: string;
  aud: string;
  email: string;
  email_verified: boolean;
  firm_membership_id: string;
  exp: number;
  iat: string;
  iss: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
  role: string;
};

export function parseJwt(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
}
