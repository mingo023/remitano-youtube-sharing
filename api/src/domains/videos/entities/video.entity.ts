import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '~domains/users/entities/user.entity';
import { BaseEntity } from '~shared/entities/base.entity';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @Column()
  sharedById: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @ManyToOne(() => UserEntity, (user) => user.videos)
  sharedBy: UserEntity;
}
