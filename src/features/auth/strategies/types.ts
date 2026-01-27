export type JwtPayload = {
  id: string;
  email: string;
  sub?: string;
  iat?: number;
  exp?: number;
};

export type JwtRequestUser = {
  id: string;
  email: string;
};
