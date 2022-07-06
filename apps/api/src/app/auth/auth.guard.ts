import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {}
