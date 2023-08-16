import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { Visitor } from './visitor.entity'; // Create this file in the same folder

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Replace with your MySQL host
      port: 3306, // Replace with your MySQL port
      username: 'root', 
      password: '1234', // Replace with your MySQL password
      database: 'gaogram_dev',
      entities: [Visitor],
      synchronize: true,
      logging: true, // Auto-create database tables (only for development)
    }),
    TypeOrmModule.forFeature([Visitor]),
  ],
  controllers: [VisitorController],
  providers: [VisitorService],
})
export class VisitorModule {}
