import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus, TTaskStatus } from '../dto/get-task.dto';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatus })
  status: TTaskStatus;
}
