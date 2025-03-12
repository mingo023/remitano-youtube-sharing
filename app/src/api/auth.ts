import httpRequest from "../hooks/use-http-request";
import { UserAuthentication, UserCertificate } from "../types/auth";

export const login = (
  data: Partial<UserCertificate>,
): Promise<UserAuthentication> => {
  return httpRequest({ url: "/auth/sign-in", method: "POST", data });
};
