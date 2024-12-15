import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('pokemon')
export class PokemonEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty({
    description: 'Name of the Pokemon',
    example: 'Pikachu',
  })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Type 1 of Pokemon',
    example: 'Dark Pokemon',
  })
  type1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Type 2 of Pokemon',
    example: 'Water',
  })
  type2: string;

  @Column({ type: 'double precision', nullable: true })
  @ApiProperty({
    description: 'Total Pokemon',
    example: '1000',
  })
  total: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Hp Pokemon',
    example: '1000',
  })
  hp: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Attack Pokemon',
    example: '1000',
  })
  attack: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Defense Pokemon',
    example: '1000',
  })
  defense: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'SpAttack Pokemon',
    example: '1000',
  })
  spAttack: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'SpDefense Pokemon',
    example: '1000',
  })
  spDefense: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Speed Pokemon',
    example: '1000',
  })
  speed: number;

  @Column({ type: 'int', nullable: true })
  @ApiProperty({
    description: 'Generation Pokemon',
    example: '1000',
  })
  generation: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Legendary Pokemon',
    example: 'true',
  })
  legendary: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Image Pokemon',
    example: 'source',
  })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'YtbUrl Pokemon',
    example: 'source',
  })
  ytbUrl: string;
}
