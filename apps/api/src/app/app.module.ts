import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthGuard } from './auth/auth.guard';
import { JWTStrategy } from './auth/jwt.strategy';
import { ViewController } from './controllers/view/view.controller';
import { ViewService } from './services/view/view.service';
import { PageView, PageViewSchema } from './schemas/view.schema';
import { StatsController } from './controllers/stats/stats.controller';
import { PageController } from './controllers/page/page.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:57202', {
      dbName: 'analytics',
    }),
    MongooseModule.forFeature([
      {
        name: PageView.name,
        schema: PageViewSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'veeva',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ViewController, StatsController, PageController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    JWTStrategy,
    ViewService,
  ],
})
export class AppModule {}
