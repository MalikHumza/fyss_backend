import { Action } from "routing-controllers";
import { parseJwt } from "../common/jwt";

export const getAuthorization = (req: any) => {
  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

export const AuthMiddleware = async (
  action: Action,
  roles: string[],
): Promise<boolean> => {
  try {
    const req = action.request;
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id, email, firm_id, firm_membership_id, role } =
        parseJwt(Authorization);
      action.request.user = {
        id,
        email,
        firm_id,
        firm_membership_id,
        role,
      };

      if (!action.request.user) return false;

      if (action.request.user && !roles.length) return true;

      if (roles.length > 0) {
        return roles.includes(action.request.user.role);
      }

      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};
