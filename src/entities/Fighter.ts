import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fight } from './Fight';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  name!: string; 

  @Column()
  wins!: number; 

  @Column()
  losses!: number; 

  @Column()
  knockouts!: number; 

  @Column()
  submissions!: number; 
  
  @Column()
  nationality!: string; 

  @Column()
  team!: string; 

  @Column()
  rank!: number;

  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fightsAsFighter1: Fight[]=[];

  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fightsAsFighter2: Fight[]=[];
}
