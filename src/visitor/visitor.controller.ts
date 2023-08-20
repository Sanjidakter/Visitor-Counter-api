import { Controller, Get, Post } from '@nestjs/common';
import { VisitorService } from './visitor.service';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get('count')
  async getVisitorCount(): Promise<{ count: number }> {
    const count = await this.visitorService.getVisitorCount();
    return { count };
  }

  @Post('increment')
  async incrementVisitorCount(): Promise<void> {
    await this.visitorService.incrementVisitorCount();
  }
}