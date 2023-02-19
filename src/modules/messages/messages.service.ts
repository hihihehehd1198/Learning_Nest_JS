import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import * as firebase from 'firebase-admin';
@Injectable()
export class MessageService {
  constructor() {}

  sendMessage() {
    const topic = 'test';
    const message = {
      data: {
        core: '850',
        time: '2.45',
      },
      topic,
    };
    return firebase.messaging().send(message);
  }
}
