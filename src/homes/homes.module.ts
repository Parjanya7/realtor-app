import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { HomesController } from './homes.controller';
import { HomesService } from './homes.service';
import { DatabaseModule } from 'src/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [DatabaseModule],
  controllers: [HomesController],
  providers: [HomesService, {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }]
})
export class HomesModule {}
