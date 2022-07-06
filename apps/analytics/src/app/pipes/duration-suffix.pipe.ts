import { Pipe, PipeTransform } from '@angular/core';

/**
 * DurationSuffixPipe is a simple suffixer that takes a numeric value expressed
 * in milliseconds as input and return it converted to the appropriate unit
 * with its suffix.
 * Beware that in its current state, it is pretty dumb and can only work with
 * round values (e.g. cannot return 1 day and 6 hours, it'll simply return 1 day).
 */
@Pipe({
  name: 'durationSuffix',
})
export class DurationSuffixPipe implements PipeTransform {
  transform(value: number): string {
    if (!Number.isInteger(value)) {
      throw new Error(`Pipe only accept integers, received: ${value}`);
    }

    const suffixes = [
      { key: 'ms', value: 0 },
      { key: 's', value: 1000 },
      { key: 'min(s)', value: 1000 * 60 },
      { key: 'hour(s)', value: 1000 * 60 * 60 },
      { key: 'day(s)', value: 1000 * 60 * 60 * 24 },
      { key: 'month(s)', value: 1000 * 60 * 60 * 31 },
      { key: 'year(s)', value: 1000 * 60 * 60 * 24 * 31 * 365 },
    ];

    let selectedSuffix;
    for (const suffix in suffixes) {
      const element = suffixes[suffix];

      if (value < element.value) {
        break;
      }

      selectedSuffix = element;
    }

    value /= selectedSuffix.value;
    return `${value} ${selectedSuffix.key}`;
  }
}
