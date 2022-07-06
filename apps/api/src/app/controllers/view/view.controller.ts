import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import {
  CreateViewDTO,
  PageView,
  ViewFilters,
} from '@veeva-test/api-interfaces';
import { AuthenticatedRequest } from '../../auth/authenticated-request.type';
import { ViewService } from '../../services/view/view.service';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  /**
   * collect store view information in the storage layer and return information
   * about created object.
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async collect(
    @Req() request: AuthenticatedRequest,
    @Res() response: Response,
    @Body() pageView: Readonly<CreateViewDTO>
  ): Promise<Response> {
    const createdPageView = await this.viewService.create({
      ...pageView, // Spread first so that we can override any keys collision
      userID: request.user.userID,
      UTCDateTime: new Date(),
    });

    return response.json({ data: createdPageView });
  }

  /**
   * getAll returns all the views for every pages with the possibility to
   * filter on browsers and origin countries.
   */
  @Get()
  async getAll(@Query() query: ViewFilters): Promise<PageView[]> {
    return await this.viewService.findAllWithFilters(query);
  }

  /** getPageViews returns all the views for a single page. */
  @Get('page/:pageID')
  async getPageViews(@Param() params: { pageID: string }): Promise<PageView[]> {
    const data = await this.viewService.findByPage(params.pageID);
    if (!data || !data.length) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND
      );
    }

    return data;
  }
}
