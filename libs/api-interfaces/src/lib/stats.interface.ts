export interface StatResponse {
  /**
   * Number of milliseconds that have been removed from current date in order
   * to retrieve value .
   */
  periodDuration: number;

  value: number;
}
