import { Module,HttpService, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import {LogsController} from './modules/logs/logs.controller';
import {LogsService} from './modules/logs/logs.service';
import {TeliGram} from './modules/telegram/telegram.controller';
import {BotService} from './modules/telegram/telegram.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController,LogsController,TeliGram],
  providers: [AppService,LogsService,BotService],
})
export class AppModule {}
