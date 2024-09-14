import { Action } from "routing-controllers";
import { parseJwt } from "../common/jwt";
import database from "@config/database";

const sessionModel = database.instance.session;

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
      const { id, name, email, role } = parseJwt(Authorization);

      const session = await sessionModel.findUnique({
        where: { sessionToken: Authorization },
      });

      if (!session || new Date(session.expires).getTime() < Date.now()) {
        return false;
      }
      action.request.user = {
        id,
        name,
        email,
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
