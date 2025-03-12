import { youtube } from '@googleapis/youtube';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { envConfig } from '~configs/env.config';

@Injectable()
export class VideoFetchService {
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

  public validateUrl(url: string) {
    const parsed = new URL(url.trim());
    let id = parsed.searchParams.get('v');

    if (VideoFetchService.validPathDomains.test(url.trim()) && !id) {
      const paths = parsed.pathname.split('/');
      id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
    } else if (
      parsed.hostname &&
      !VideoFetchService.validQueryDomains.has(parsed.hostname)
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

    return id;
  }

  public validateID(id: string) {
    return VideoFetchService.idRegex.test(id.trim());
  }

  public async getVideoInfo(videoId: string) {
    const videos = await youtube('v3').videos.list({
      id: [videoId],
      part: ['snippet', 'statistics'],
      fields: 'items(snippet(title,description),statistics)',
      key: envConfig.YOUTUBE.API_KEY,
    });

    const video = videos.data.items[0];

    return {
      title: video.snippet.title,
      description: video.snippet.description,
      likes: parseInt(video.statistics.likeCount) || 0,
      dislikes: parseInt(video.statistics.dislikeCount) || 0,
    };
  }
}
