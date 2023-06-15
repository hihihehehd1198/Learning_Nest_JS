import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AppModule } from './app.module';
import * as express from 'express';
import { AccessTokenGuards } from './auth/guards/accessToken.guard';
import { RefreshTokenGuard } from './auth/guards/refreshToken.guard';
import * as firebase from 'firebase-admin';
import * as http from 'http';
import * as io from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as fs from 'fs';
const firebaseConfig = {
  apiKey: 'AIzaSyDkZSndxYuL_T_BuI3mJjXYc_woBcL2uDM',
  authDomain: 'thoikhoabieu-a5075.firebaseapp.com',
  projectId: 'thoikhoabieu-a5075',
  storageBucket: 'thoikhoabieu-a5075.appspot.com',
  messagingSenderId: '296430630672',
  appId: '1:296430630672:web:548df9d6b28bfbc9e75795',
  // vapidKey:
  //   'BEkh9Z6npt9j4OQAu0X3On_-b-w1jtry0l8xW2FJSuECFBMVblUAbrKoq2vhF04LWLd6k7oby2apta6aAQRilSs',
};
firebase.initializeApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('src/assets/cert/RootCA.key'),
      cert: fs.readFileSync('src/assets/cert/RootCA.pem'),
    },
    cors: {
      origin: 'http://127.0.0.1:1234/',
    },
  });
  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AccessTokenGuards(reflector));
  app.use(express.json({ limit: '100mb' }));
  // const server = http.createServer(app.getHttpServer());
  // const ioServer = new io.Server(server)
  // app.useWebSocketAdapter(new IoAdapter(ioServer));

  await app.listen(4000, '192.168.43.133');
  // app.enableCors();
  // app.listen(4000)
}
bootstrap();
