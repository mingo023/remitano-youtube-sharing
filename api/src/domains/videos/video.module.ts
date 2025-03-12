import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideoRepository } from './repositories/video.repository';
import { VideoController } from './controllers/http/video.controller';
import { VideoService } from './services/video.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  providers: [VideoRepository, VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
