import { Request } from '@nestjs/common';

import { UserInfo } from './jwt.strategy';

/**
 * AuthenticatedRequest extends basic nest.js request to add information
 * extracted by JWTStrategy.
 */
export interface AuthenticatedRequest extends Request {
  readonly user: UserInfo;
}
