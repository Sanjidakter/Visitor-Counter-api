import { Repository } from 'typeorm';
import { Visitor } from './visitor.entity'; // Import your Visitor entity
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  async incrementVisitorCount(): Promise<void> {
    const newVisitor = new Visitor();
    newVisitor.visitorCount = await this.calculateNewVisitorCount();

    await this.visitorRepository.save(newVisitor);
  }

  async getVisitorCount(): Promise<number> {
    const allVisitors = await this.visitorRepository.find();
  
    if (allVisitors.length === 0) {
      return 0; // Return 0 if no visitors are found
    }
  
    return allVisitors[allVisitors.length - 1].visitorCount;
  }
  
  

  private async calculateNewVisitorCount(): Promise<number> {
    const maxVisitorCount = await this.visitorRepository
      .createQueryBuilder('visitor')
      .select('MAX(visitor.visitorCount)', 'maxCount')
      .getRawOne();

    const newDefaultVisitorCount = maxVisitorCount.maxCount + 1;

    return newDefaultVisitorCount;
  }
}
