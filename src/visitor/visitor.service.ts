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
  
    let totalVisitorCount = 0;
    for (const visitor of allVisitors) {
      totalVisitorCount = visitor.visitorCount;
    }
  
    return totalVisitorCount;
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
