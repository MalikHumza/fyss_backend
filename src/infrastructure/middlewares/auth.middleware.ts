import { Action } from "routing-controllers";
import { parseJwt } from "@infrastructure/common/jwt";

// const sessionModel = database.instance.session;

export const getAuthorization = (req: any) => {
  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

export const AuthMiddleware = async (
  action: Action,
): Promise<boolean> => {
  try {
    const req = action.request;
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id, name, email, role } = parseJwt(Authorization);

      // const session = await sessionModel.findUnique({
      //   where: { sessionToken: Authorization },
      // });

      // if (!session || new Date(session.expires).getTime() < Date.now()) {
      //   return false;
      // }
      action.request.user = {
        id,
        name,
        email,
        role,
      };

      if (!action.request.user) return false;

      if (action.request.user) return true;

      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};
