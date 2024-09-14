import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id: string;
  name: string;
  email: string;
  role: string;
  exp: any;
};

export function parseJwt(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
}
