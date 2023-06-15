import { Module } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ChatGateway } from './chat.gateway';
@Module({
  providers: [ChatGateway],
})
export class ChatModule {
  // configure(consumer:any):void{
  //     consumer.apply(IoAdapter).forRoutes({path:"chat",method:requestmeth})
  // }
}
