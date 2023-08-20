import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  async incrementVisitorCount(): Promise<void> {
    try {
      // Use TypeORM query builder to increment the visitorCount
      await this.visitorRepository
        .createQueryBuilder()
        .update(Visitor)
        .set({ visitorCount: () => "visitorCount + 1" })
        .execute();
    } catch (error) {
      // Handle error (e.g., if the record does not exist)
      throw error;
    }
  }
  
  async getVisitorCount(): Promise<number> {
    try {
      // Use TypeORM query builder to retrieve the visitorCount
      const result = await this.visitorRepository
        .createQueryBuilder()
        .select("visitorCount")
        .getRawOne();
  
      if (result) {
        return result.visitorCount;
      } else {
        return 0; // If no visitor record exists, return 0
      }
    } catch (error) {
      // Handle error (e.g., if the record does not exist)
      throw error;
    }
  }
  
}
