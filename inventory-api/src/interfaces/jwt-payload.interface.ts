import { Request as HttpRequest } from 'express';

export default interface JwtAuthPayload {
  id: string;
  email: string;
  businessId: string;
  salepointId?: string;
}

export type AuthRequest = HttpRequest & { user: JwtAuthPayload };
