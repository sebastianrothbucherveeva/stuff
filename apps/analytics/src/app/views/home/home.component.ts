import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'veeva-test-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  pages$: Observable<string[]>;

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.pages$ = this.pageService.getPages();
  }
}
