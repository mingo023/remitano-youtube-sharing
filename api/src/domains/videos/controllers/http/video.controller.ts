import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { VideoService } from '~domains/videos/services/video.service';
import { PaginateVideosDto } from '../dto/paginate-videos.dto';
import { CurrentUser } from '~shared/decorators/current-user.decorator';
import { UserEntity } from '~domains/users/entities/user.entity';
import { JwtAuthGuard } from '~domains/auth/guards/auth.guard';
import { CreateVideoDto } from '../dto/create-video.dto';
import { ThrottlerBehindProxyGuard } from '~shared/guards/throttler-behind-proxy.guard';

@Controller('videos')
@UseGuards(JwtAuthGuard)
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get()
  public async getVideos(
    @Query() query: PaginateVideosDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.videoService.getVideos(
      user.id,
      query.limit || 10,
      query.page || 0,
    );
  }

  @Post()
  @UseGuards(ThrottlerBehindProxyGuard)
  public async createVideo(
    @CurrentUser() user: UserEntity,
    @Body() body: CreateVideoDto,
  ) {
    return this.videoService.createVideo(user.id, body.url);
  }
}
