import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Fighter } from './Fighter';
import { Event } from './Event';

@Entity()
export class Fight {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter1)
  fighter1!: Fighter;

  @ManyToOne(() => Fighter, (fighter) => fighter.fightsAsFighter2)
  fighter2!: Fighter;

  @ManyToOne(() => Event, (event) => event.fights)
  event: Event= new Event();

}
