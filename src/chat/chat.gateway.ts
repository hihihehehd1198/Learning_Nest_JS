import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { interval, tap } from 'rxjs';
import { Server, Socket } from 'socket.io';

// { cors: true }
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  generateFn(time): number {
    let timer = Math.random() * 10;
    if (+timer >= 5) {
      time.this.server.disconnectSockets();
    }
    return timer;
  }

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() message: string): void {
    console.log('cchat emit ,', message);

    // if () {
    const time = interval(1000)
      .pipe(
        tap(() => {
          this.server.emit(
            'chat',
            message == 'error' ? Error('error') : this.generateFn(time),
          );
        }),
      )
      .subscribe();
    // }
  }
}
