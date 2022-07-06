import {
  ArrayNotEmpty,
  IsAlpha,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

/**
 * CreateViewDTO represents the data sent by the client in the body of a
 * request to record a page view in the storage engine.
 */
export class CreateViewDTO {
  /** pageID is the ID of the page viewed in a UUID-v4 format. */
  @IsNotEmpty()
  @IsUUID('4')
  pageID: string;

  /**
   * country contains the name of the country from which user accessed the page.
   */
  @IsNotEmpty()
  @IsAlpha()
  country: string;

  /**
   * browser contains the name of the browser used by user to access the page.
   */
  @IsNotEmpty()
  browser: string;
}

/**
 * ViewFilters represents the query filters that can be provided on page view
 * retrieval endpoint.
 */
export class ViewFilters {
  /**
   * countries is an array of country names for which we want to retrieve
   * page views.
   */
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  countries: string[];

  /**
   * browsers is an array of browser names for which we want to retrieve
   * page views.
   */
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  browsers: string[];
}

/** View represents the information collected when a user view a page. */
export interface PageView extends CreateViewDTO {
  /** userID is the ID of the user that viewed the page in a UUID-v4 format. */
  userID: string;

  /**
   * UTCDateTime is a Date object containing the date/time at which the page
   * was viewed using UTC timezone.
   */
  UTCDateTime: Date;
}
