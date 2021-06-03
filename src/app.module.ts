import { Module,HttpService, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import {LogsController} from 'src/modules/logs/logs.controller'
import {LogsService} from 'src/modules/logs/logs.service'
import {TeliGram} from 'src/modules/telegram/telegram.controller';
import {BotService} from 'src/modules/telegram/telegram.service'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController,LogsController,TeliGram],
  providers: [AppService,LogsService,BotService],
})
export class AppModule {}
