import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PageView, StatResponse } from '@veeva-test/api-interfaces';
import { GraphData } from '../../components/graph/graph.component';
import { LoggerService } from '../../services/logger.service';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'veeva-test-page-stats',
  templateUrl: './page-stats.component.html',
  styleUrls: ['./page-stats.component.scss'],
})
export class PageStatsComponent implements OnInit, OnDestroy {
  pageName: string;

  data: GraphData[] = [];

  activeVisitorsStats$: Observable<StatResponse>;

  isLoaded: boolean = false;

  private _data: Map<string, GraphData> = new Map();

  private destroy$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private loggerService: LoggerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pageID = this.route.snapshot.paramMap.get('pageID');
    if (!pageID) {
      this.loggerService.critical(
        new Error('Missing page ID in page URL'),
        'Invalid route, you will be redirected to the homepage'
      );
      this.router.navigate(['/']);
    }

    this.setPageViewsData(pageID);
    this.activeVisitorsStats$ = this.pageService.getActiveUsers(pageID);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Transform API response to create series grouped by country */
  private setPageViewsData(pageID: string): void {
    this.pageService
      .getPageViews(pageID)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: PageView[]) => {
          this.pageName = pageID;
          response.forEach((value) => {
            if (!this._data.has(value.country)) {
              this._data.set(value.country, {
                name: value.country,
                value: 1,
              });
              return;
            }

            const data = this._data.get(value.country);
            this._data.set(value.country, {
              ...data,
              value: data.value + 1,
            });
          });

          this.isLoaded = true;
          this.data = Array.from(this._data.values());
        },
        (error) => {
          if (error.status && error.status === 404) {
            this.router.navigate(['/404']);
            return;
          }

          this.loggerService.critical(
            error,
            'Unexpected error, please refresh the page'
          );
        }
      );
  }
}
