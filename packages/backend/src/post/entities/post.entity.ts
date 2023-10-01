import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/BaseEntity.entity';
import { PostRepository } from '../post.repository';

@Entity()
export class Post extends BaseEntity {
  // to allow inference in `em.getRepository()`
  [EntityRepositoryType]?: PostRepository;

  @Property()
  title: string;

  @Property()
  content: string;

  @Property({ nullable: true })
  deletedAt: Date = new Date();
}
