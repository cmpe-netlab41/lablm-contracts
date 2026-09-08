import { z } from 'zod';

// Shape only — no crypto, no claim logic in the contract package.
export const AuthenticatedSession = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  sessionId: z.string(),
});
export type AuthenticatedSession = z.infer<typeof AuthenticatedSession>;
