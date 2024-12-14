export interface AuthPayload {
  id: string;
  userName: string | null;
  iat: number;
  exp: number;
}
