import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { VideoEntity } from '../entities/video.entity';

@Injectable()
export class VideoRepository extends Repository<VideoEntity> {
  constructor(private dataSource: DataSource) {
    super(VideoEntity, dataSource.createEntityManager());
  }

  async paginateVideos(userId: string, limit: number, page: number) {
    const [videos, total] = await Promise.all([
      this.find({
        where: { sharedById: userId },
        relations: {
          sharedBy: true,
        },
        order: {
          createdAt: 'DESC',
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.count({
        where: { sharedById: userId },
      }),
    ]);

    return {
      videos,
      total,
    };
  }
}
