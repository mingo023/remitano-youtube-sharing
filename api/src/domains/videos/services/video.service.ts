import { Injectable } from '@nestjs/common';
import { VideoRepository } from '../repositories/video.repository';
import { VideoFetchService } from './video-fetch.service';

@Injectable()
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private videoFetchService: VideoFetchService,
  ) {}

  public async getVideos(userId: string, limit: number, page: number) {
    return this.videoRepository.paginateVideos(userId, limit, page);
  }

  public async createVideo(userId: string, videoUrl: string) {
    const videoId = this.videoFetchService.validateUrl(videoUrl);

    const videoInfo = await this.videoFetchService.getVideoInfo(videoId);

    await this.videoRepository.insert({
      sharedById: userId,
      url: videoUrl,
      title: videoInfo.title,
      description: videoInfo.description,
      likes: videoInfo.likes,
      dislikes: videoInfo.dislikes,
    });
  }
}
