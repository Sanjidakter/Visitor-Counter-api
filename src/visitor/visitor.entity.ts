import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  visitorCount: number;
}
