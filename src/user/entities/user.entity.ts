import { Tasks } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  /* arg1: return type of this property
  arg2: how do we access the user from the
  other side of relation
  arg3: setting eager to 'true' will
  automatically fetch the tasks with it */
  @OneToMany(() => Tasks, (task) => task.user, { eager: true })
  task: Tasks[];
}
