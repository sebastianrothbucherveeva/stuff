import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'veeva-test-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public router: Router) {}

  redirect(): void {
    this.router.navigate(['/']);
  }
}
