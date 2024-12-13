import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, BaseEntity as Base } from 'typeorm';

export abstract class BaseEntity extends Base {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Id Entity',
    example: '1',
  })
  id: number;

  @ApiProperty({ description: 'Ngày tạo' })
  createdAt: Date;

  @ApiProperty({
    description: 'Người tạo, lưu user.id',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  createdBy: string;

  @ApiProperty({ description: 'Ngày sửa cuối' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Người sửa cuối, lưu user.id',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @Column({ type: 'varchar', nullable: true })
  updatedBy: string;
}
