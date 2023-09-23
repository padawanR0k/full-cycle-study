import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../entities/BaseEntity.entity';

@Entity()
export class Post extends BaseEntity {
  @Property()
  title: string;

  @Property()
  content: string;

  @Property()
  deletedAt: Date = new Date();
}
