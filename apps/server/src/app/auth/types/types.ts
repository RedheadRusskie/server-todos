export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export interface AuthRO {
  accessToken: string;
  userId: string;
}
