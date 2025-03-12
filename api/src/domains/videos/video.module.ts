import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideoRepository } from './repositories/video.repository';
import { VideoController } from './controllers/http/video.controller';
import { VideoService } from './services/video.service';
import { VideoFetchService } from './services/video-fetch.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideoEntity])],
  providers: [VideoRepository, VideoService, VideoFetchService],
  controllers: [VideoController],
})
export class VideoModule {}
