import { Injectable } from '@nestjs/common';
import { UserUpdateDto } from '../../auth/dto/user/user-response';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './user.entity';

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
    try {
      if (!user.id) {
        throw new Error('error ');
      } else
        await this.prismaService.user.update({
          where: {
            id: user.id,
          },
          data: { ...user },
        });
      return { response: 'success' };
    } catch (error) {
      throw new Error(error);
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
      console.log('res', res);
      return { response: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
