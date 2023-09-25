import { Post } from './blog/entities/post.entity';

export default {
  entities: [Post], // no need for `entitiesTs` this way
  dbName: 'postgres',
  type: 'postgresql',
  password: 'postgres',
  user: 'postgres',
};
