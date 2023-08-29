import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from './Fight';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  location!: string;

  // Other properties...

  @OneToMany(() => Fight, (fight) => fight.event)
  fights: Fight[]=[];
}
