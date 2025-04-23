// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

import { Controller, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changue-password.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    return this.authService.login(user);
  }
  
  @Post('forget_password')
  async forget(@Body('email') email:string){
    return this.authService.sendMailPassword(email)
  }

  @Post('recover-password/:tokenJWT')
  async changuePassword(@Param('tokenJWT') token:string,@Body() contraseñas:ChangePasswordDto){
    const {newPassword,repeatPassword}=contraseñas
    if(newPassword===repeatPassword){
      return this.authService.recoverPassword(token,newPassword)
    }
    return new BadRequestException("La contraseñas no son iguales")

  }
}