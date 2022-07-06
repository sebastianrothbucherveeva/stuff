import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { GraphComponent } from './components/graph/graph.component';
import { StatsComponent } from './components/stats/stats.component';
import { PageStatsComponent } from './views/page-stats/page-stats.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DurationSuffixPipe } from './pipes/duration-suffix.pipe';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    StatsComponent,
    PageStatsComponent,
    DurationSuffixPipe,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
