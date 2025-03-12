export type UserCertificate = {
  email: string;
  password: string;
};

export type UserAuthentication = {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
};
