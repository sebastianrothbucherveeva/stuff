import { Controller, Get, Param } from '@nestjs/common';

import { StatResponse } from '@veeva-test/api-interfaces';
import { ViewService } from '../../services/view/view.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly viewService: ViewService) {}

  /**
   * getPageActiveUsers returns the number of unique users having been active on
   * the page in a given time period.
   */
  @Get('page/:pageID/active')
  async getPageActiveUsers(
    @Param() params: { pageID: string }
  ): Promise<StatResponse> {
    const periodDuration =
      Number(process.env.ANALYTICS_PAGE_UNIQUE_VISITORS_TIME_PERIOD) || 1800000;
    const startDate = new Date(Date.now() - periodDuration);
    return {
      periodDuration: periodDuration,
      value: await this.viewService.getUserCountInPeriods(
        params.pageID,
        startDate
      ),
    };
  }
}
