import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { PageView as View } from '@veeva-test/api-interfaces';

export type PageViewDocument = PageView & Document;

@Schema()
export class PageView implements View {
  @Prop({ type: String, default: () => uuidv4() })
  _id: string;

  @Prop({ required: true })
  pageID: string;

  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  UTCDateTime: Date;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  browser: string;
}

export const PageViewSchema = SchemaFactory.createForClass(PageView);
