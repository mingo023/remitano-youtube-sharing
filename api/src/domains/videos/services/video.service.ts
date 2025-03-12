import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import { VideoRepository } from '../repositories/video.repository';

@Injectable()
export class VideoService {
  static validQueryDomains = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'music.youtube.com',
    'gaming.youtube.com',
  ]);
  static validPathDomains =
    /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
  static idRegex = /^[a-zA-Z0-9-_]{11}$/;

  constructor(private videoRepository: VideoRepository) {}

  public async getVideos(userId: string, limit: number, page: number) {
    return this.videoRepository.paginateVideos(userId, limit, page);
  }

  public async createVideo(userId: string, videoUrl: string) {
    this.validateUrl(videoUrl);

    const videoInfo = await this.getVideoInfo(videoUrl);

    await this.videoRepository.insert({
      sharedById: userId,
      url: videoUrl,
      title: videoInfo.title,
      description: videoInfo.description,
      likes: videoInfo.likes,
      dislikes: videoInfo.dislikes,
    });
  }

  private validateUrl(url: string) {
    const parsed = new URL(url.trim());
    let id = parsed.searchParams.get('v');

    if (VideoService.validPathDomains.test(url.trim()) && !id) {
      const paths = parsed.pathname.split('/');
      id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
    } else if (
      parsed.hostname &&
      !VideoService.validQueryDomains.has(parsed.hostname)
    ) {
      throw new UnprocessableEntityException('Invalid video url');
    }
    if (!id) {
      throw new UnprocessableEntityException('Invalid video id');
    }
    id = id.substring(0, 11);
    if (!this.validateID(id)) {
      throw new UnprocessableEntityException('Invalid video id');
    }
  }

  private validateID(id: string) {
    return VideoService.idRegex.test(id.trim());
  }

  private async getVideoInfo(url: string) {
    const videoInfo = await ytdl.getBasicInfo(url);

    return {
      title: videoInfo.videoDetails.title,
      description: videoInfo.videoDetails.description,
      likes: videoInfo.videoDetails.likes || 0,
      dislikes: videoInfo.videoDetails.dislikes || 0,
    };
  }
}
