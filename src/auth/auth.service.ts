import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // Méthode pour valider l'utilisateur
  async validateUser({
    username,
    password,
  }: AuthPayloadDto): Promise<User | null> {
    const findUser: User = await this.userService.findByUsername(username);
    if (!findUser) {
      return null;
    }

    // Validation du mot de passe
    if (password === findUser.password) {
      const { password, ...userWithoutPassword } = findUser; // Utilisation du spread operator pour retirer le mot de passe
      return userWithoutPassword as User; // Retourne l'utilisateur sans le mot de passe
    }

    return null; // Retourne null si la validation échoue
  }

  // Méthode pour générer un token JWT après validation
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Génère et retourne un token JWT
    };
  }
}
