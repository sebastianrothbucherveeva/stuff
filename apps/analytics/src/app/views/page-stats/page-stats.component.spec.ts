import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoggerService } from '../../services/logger.service';
import { PageService } from '../../services/page.service';
import { PageStatsComponent } from './page-stats.component';
import { GraphComponent } from '../../components/graph/graph.component';
import { StatsComponent } from '../../components/stats/stats.component';

describe('PageStatsComponent', () => {
  const routeParams = new Map();
  const pageID = '123456789';

  let component: PageStatsComponent;
  let fixture: ComponentFixture<PageStatsComponent>;

  let loggerService: LoggerService;

  let pageServiceMock: any;

  beforeEach(async () => {
    routeParams.set('pageID', pageID);

    pageServiceMock = {
      getPageViews: jest.fn(),
      getActiveUsers: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        NgxChartsModule,
        BrowserAnimationsModule,
      ],
      declarations: [PageStatsComponent, GraphComponent, StatsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: routeParams,
            },
          },
        },
        {
          provide: PageService,
          useValue: pageServiceMock,
        },
        LoggerService,
        HttpClient,
      ],
    }).compileComponents();

    loggerService = TestBed.inject(LoggerService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStatsComponent);
    component = fixture.componentInstance;
  });

  it('Should redirect to the homepage when page ID is missing', () => {
    pageServiceMock.getPageViews.mockReturnValue(of());

    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    routeParams.delete('pageID');

    // Empty function to avoid logs pollution
    loggerService.critical = () => {};

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('Should set page data on load', () => {
    pageServiceMock.getPageViews.mockReturnValue(
      of([
        {
          country: 'Germany',
        },
        {
          country: 'Germany',
        },
        {
          country: 'France',
        },
      ])
    );

    fixture.detectChanges();

    expect(component.data).toEqual([
      {
        name: 'Germany',
        value: 2,
      },
      {
        name: 'France',
        value: 1,
      },
    ]);
  });

  it('Should send error to logger service in case something happen', () => {
    const spy = spyOn(loggerService, 'critical');

    pageServiceMock.getPageViews.mockReturnValue(throwError(new Error('test')));

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
