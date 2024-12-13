/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.decode(token) as any;
      const ref = await this.authService.checkOldToken(decoded);
      if (!ref) {
        throw new UnauthorizedException(
          'Tài khoản không tồn tại hoặc token đã hết hạn sử dụng',
        );
      }

      if (!decoded) {
        throw new UnauthorizedException('Invalid token format');
      }

      if (!decoded.iat) {
        throw new UnauthorizedException('Invalid token: missing issue date');
      }

      // Check if the token issue date is before the password change
      if (decoded.updatedAt) {
        const passwordChangedAtTimestamp = Math.floor(
          new Date(decoded.updatedAt).getTime() / 1000,
        );

        if (decoded.iat < passwordChangedAtTimestamp) {
          throw new UnauthorizedException(
            'Token is no longer valid due to password change',
          );
        }
      }

      // Verify the token's authenticity
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'topSecret51',
      });

      // Attach the payload to the request object
      request['account'] = payload;
    } catch (err) {
      console.error('Token verification failed:', err.message || err);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  /**
   * Extracts the Bearer token from the Authorization header
   * @param request Express request object
   * @returns The token string if found, undefined otherwise
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
