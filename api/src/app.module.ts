import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './configs/database.config';
import { UserModule } from './domains/users/user.module';
import { AuthModule } from './domains/auth/auth.module';
import { VideoModule } from '~domains/videos/video.module';
import { SocketModule } from '~sockets/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    VideoModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
