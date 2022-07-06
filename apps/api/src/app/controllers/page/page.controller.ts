import { Controller, Get } from '@nestjs/common';

import { ViewService } from '../../services/view/view.service';

@Controller('page')
export class PageController {
  constructor(private readonly viewService: ViewService) {}

  /**
   * getAll returns all the pages registered in the database.
   */
  @Get()
  async getAll(): Promise<string[]> {
    return await this.viewService.getPages();
  }
}
