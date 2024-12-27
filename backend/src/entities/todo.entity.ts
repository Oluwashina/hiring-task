import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity"; 

@Entity("todo")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: "is_completed", default: false })
  isCompleted: boolean;

  @Column({ name: "due_date", type: "date" })
  dueDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos) 
  @JoinColumn({ name: 'user_id' }) // Use JoinColumn as a separate decorator
  user: UserEntity;
}