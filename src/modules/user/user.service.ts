import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from '../../auth/dto/user/user-response';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './user.entity';
import { hash } from 'argon2';
import { ERROR_RESPONSE } from 'src/shared/utils';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll(id?: number) {
    return await this.prismaService.user.findMany({
      where: {
        id,
      },
    });
  }

  async updateUser(user: UserUpdateDto) {
    console.log('user.password', user.password);
    const hashedPassword = user?.password ? await hash(user.password) : null;
    delete user.password;
    try {
      if (!user.id) {
        throw new Error('error ');
      }

      const response: User = await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: hashedPassword ? { ...user, hashedPassword } : { ...user },
      });
      return response;
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }
  async deleteUser(id: number[]) {
    try {
      if (!id.length) {
        throw new Error('missing id when request ');
      }

      const res = await this.prismaService.user.deleteMany({
        where: {
          OR: [
            {
              id: {
                in: [...id],
              },
            },
          ],
        },
      });
      return 'ok';
    } catch (error) {
      ERROR_RESPONSE(error);
    }
  }

  async changePassword(user: { email: string; password: string }) {
    console.log('user.password', user.password);

    try {
      const hashedPassword = user?.password ? await hash(user.password) : null;
      //findUser before change password
      const userFind = await this.prismaService.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (!userFind) {
        throw new Error('khong tim thay user ');
      }
      const response = await this.prismaService.user.update({
        where: {
          id: userFind.id,
        },
        data: {
          hashedPassword,
        },
      });
      return 'password has changed';
    } catch (error) {
      ERROR_RESPONSE(error);
    }
    // return await null;
  }
}
