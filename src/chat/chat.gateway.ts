import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


// { cors: true }
@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('chat')
    handleMessage(@MessageBody() message: string): void {
        console.log('cchat emit ,', message)
        this.server.emit('chat', message)
    }

}