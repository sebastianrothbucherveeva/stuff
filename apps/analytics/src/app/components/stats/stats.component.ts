import { Component, Input } from '@angular/core';

@Component({
  selector: 'veeva-test-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() stat: string;
  @Input() label: string;
}
