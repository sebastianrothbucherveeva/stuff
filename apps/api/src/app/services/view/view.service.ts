import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PageView, PageViewDocument } from '../../schemas/view.schema';
import { PageView as View, ViewFilters } from '@veeva-test/api-interfaces';

export interface PageStats {
  /**
   * Number of unique (user will only be counted once when visiting the page
   * multiple time) visitors having visited page.
   */
  uniqueVisitorsForPage: number;

  /**
   * Percentage of users having visited page more than once, defined by the
   * number of returning users divided by the number of unique visitors
   */
  returningVisitorsRate: number;
}

@Injectable()
export class ViewService {
  constructor(
    @InjectModel(PageView.name)
    private readonly pageViewModel: Model<PageViewDocument>
  ) {}

  /** Persist a new PageView in the storage engine */
  async create(pageView: Readonly<View>): Promise<PageView> {
    const createdView = new this.pageViewModel(pageView);
    return createdView.save();
  }

  /** Returns every PageView matching provided filters */
  async findAllWithFilters(filters?: ViewFilters): Promise<PageView[]> {
    let query = this.pageViewModel.find().select({
      pageID: 1,
      UTCDateTime: 1,
      country: 1,
      browser: 1,
    });
    if (!filters) {
      return query.exec();
    }

    const queryFilters = {};
    const { countries, browsers } = filters;
    if (Array.isArray(countries) && countries.length) {
      queryFilters['country'] = { $in: countries };
    }

    if (Array.isArray(browsers) && browsers.length) {
      queryFilters['browser'] = { $in: browsers };
    }

    return query.find(queryFilters).exec();
  }

  /** Return PageViews for page */
  async findByPage(pageID: string): Promise<PageView[]> {
    return this.pageViewModel
      .find({ pageID })
      .select({
        pageID: 1,
        UTCDateTime: 1,
        country: 1,
        browser: 1,
      })
      .exec();
  }

  /**
   * getUserCountInPeriods returns the number of users having visited a given
   * page in a given period.
   *
   * @param startingFrom represents the date starting from which we want to
   * retrieve results.
   */
  async getUserCountInPeriods(
    pageID: string,
    startingFrom: Date
  ): Promise<number> {
    const uniqueVisitorsForPageInPeriod = await this.pageViewModel
      .find({ UTCDateTime: { $gte: startingFrom } })
      .distinct('userID', { pageID })
      .exec();

    return uniqueVisitorsForPageInPeriod.length;
  }

  /** getPages returns all the page IDs registered in the DB */
  async getPages(): Promise<string[]> {
    return this.pageViewModel.distinct('pageID').exec();
  }
}
