import { Module,HttpService, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
//import {LogsController} from './modules/logs/logs.controller';
//import {LogsService} from './modules/logs/logs.service';
import {TeliGram} from './modules/telegram/telegram.controller';
import {BotService} from './modules/telegram/telegram.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule.register({
      headers: {'accept': 'application/json', 
      'Accept-Language': `hi_IN`} // object of headers you want to set
    })
  ],
  controllers: [AppController,TeliGram],
  providers: [AppService,BotService],
})
export class AppModule {}
