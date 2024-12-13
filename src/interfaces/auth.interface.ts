export interface AuthPayload {
  id: string;
  userName: string | null;
  updatedAt: string | null;
  iat: number;
  exp: number;
}