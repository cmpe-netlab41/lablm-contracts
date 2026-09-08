import { z } from 'zod';
import { EXACTLY_ONE_IDENTIFIER_MESSAGE, IdentifierFields, exactlyOneIdentifier } from '../domain/identifier';
import { AuthenticatedSession } from '../domain/session';

// --- loginWithCredentials: POST /iam/authentication/login-with-credentials ---
export const LoginWithCredentialsBody = IdentifierFields.extend({
     password: z.string().min(8).max(128),
}).refine(exactlyOneIdentifier, { message: EXACTLY_ONE_IDENTIFIER_MESSAGE });
export type LoginWithCredentialsBody = z.infer<typeof LoginWithCredentialsBody>;

export const LoginWithCredentialsResponse = AuthenticatedSession;
export type LoginWithCredentialsResponse = z.infer<typeof LoginWithCredentialsResponse>;
