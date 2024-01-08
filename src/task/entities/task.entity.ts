import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus, TTaskStatus } from '../dto/get-task.dto';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatus, default: TaskStatus[0] })
  status: TTaskStatus;

  @ManyToOne(() => User, (user) => user.task, { eager: false })
  user: User;
}
