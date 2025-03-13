import { Column, Entity, OneToMany } from 'typeorm';
import { VideoEntity } from '~domains/videos/entities/video.entity';
import { BaseEntity } from '~shared/entities/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => VideoEntity, (video) => video.sharedBy)
  videos: VideoEntity[];
}
