// src/app.module.ts
import { Module } from '@nestjs/common';
import { VisitorModule } from './visitor/visitor.module';

@Module({
  imports: [VisitorModule],
})
export class AppModule {}
