import { BotService } from './telegram.service'
import { Get, Controller, Res, HttpStatus ,Logger} from '@nestjs/common';
import { Observable,from,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Cron ,Interval} from '@nestjs/schedule';

@Controller()
export class TeliGram {
  private readonly logger = new Logger(TeliGram.name);
  constructor(private botService:BotService) {}

  @Get('botmessage')
  getBotDialog(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send("Bot service started");
  }

  @Get('slotnotify')
  getSlots(@Res() res) {
    this.botService.notifyBOt();
    res.status(HttpStatus.OK).send("notification sent");
  }

 
  @Get('getAllSlots')
   getAll()  {
 
    var resAll=[]


    return this.botService.callAll().pipe(
        map((res:any)=> {
            
            res.forEach((item:any) => {
                resAll=resAll.concat(item.data.sessions)
            });

            var rs:any=resAll.filter((result)=>{
              return (result.min_age_limit==18 && result.available_capacity_dose1>0)
            });
            
            this.botService.notify(rs);
            return rs;
           
        })

    ); 

   
    
    
    
  }

  @Cron('45 * * * * *')
  getScheduleSlots()  {
    this.logger.debug('Called when the current second is 45');
    var resAll=[]

  try{
     this.botService.callAll().pipe(
        map((res:any)=> {
          
            res.forEach((item:any) => {
                resAll=resAll.concat(item.data.sessions)
            });

            var rs:any=resAll.filter((result)=>{
              return (result.min_age_limit==18 && result.available_capacity_dose1>0)
            });
            
            this.botService.notify(rs);
           // return rs;
           
        }),
        catchError(err => {
          this.logger.debug('in exception',err);
         return of('error', err)
        
        })

    ); 
      }
      catch(ex){
        this.logger.debug('Called when the current second is 45',JSON.stringify(ex));
      }

    
  }
  
  @Get('getbbmp')
  getBBMP() {
    try{
    return this.botService.getSlots();
    }
    catch(ex){
      return "caught exception:"+ex
    }
    
  }

  



}