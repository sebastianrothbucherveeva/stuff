import { Component, Input, OnInit } from '@angular/core';

export interface GraphData {
  /** Name of the column in the graph */
  name: string;
  value: number;
}

@Component({
  selector: 'veeva-test-graph',
  templateUrl: './graph.component.html',
})
export class GraphComponent implements OnInit {
  @Input() data: GraphData;

  @Input() view: number[] = [700, 400];

  @Input() xAxisLabel: string;

  @Input() yAxisLabel: string;

  constructor() {}

  ngOnInit(): void {}
}
