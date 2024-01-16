import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Credentials } from './authentication.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() payload: Credentials) {
    return this.authService.login(payload);
  }

  @Post('signup')
  async signup(@Body() payload: Credentials) {
    return this.authService.signup(payload);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token in Authorization header' })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
