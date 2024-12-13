export interface AuthPayload {
  id: number;
  userName: string | null;
  updatedAt: string | null;
  iat: number;
  exp: number;
}