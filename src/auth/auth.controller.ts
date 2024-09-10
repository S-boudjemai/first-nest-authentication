import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Route pour la connexion, qui génère un token JWT
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Request() req: { user: any }) {
    return this.authService.login(req.user); // Passe l'utilisateur validé à la méthode login pour générer un token
  }

  // Route protégée par JWT, qui vérifie si le token est valide
  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Request() req: { user: any }) {
    return req.user; // Retourne les informations de l'utilisateur si le token est valide
  }
}
