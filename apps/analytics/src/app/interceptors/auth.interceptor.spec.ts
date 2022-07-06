import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { environment } from '../../environments/environment';
import { PageService } from '../services/page.service';

describe('AuthInterceptor', () => {
  let service: PageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.inject(PageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Should set Authorization header', () => {
    service.getPages().subscribe(() => undefined);

    const httpRequest = httpMock.expectOne(`${environment.apiURL}/page`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});
