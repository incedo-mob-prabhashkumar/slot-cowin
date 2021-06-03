import { Injectable, Logger,HttpService } from '@nestjs/common';
import { Observable,from } from 'rxjs';
import { map ,mergeMap} from 'rxjs/operators';
import { of,forkJoin } from 'rxjs';
import { Cron ,Interval} from '@nestjs/schedule';

@Injectable()
export class BotService   {
    private readonly logger = new Logger(BotService.name);
    token:string = '1812344701:AAFkTX4pxDyYsDz-TE--izsTsno9K8PwiZs';
    bot:any;
    msgId:any;
    constructor(private http: HttpService){
        const TelegramBot = require('node-telegram-bot-api');
        this.bot = new TelegramBot(this.token, { polling: true });
    }
   
    botMessage() {        
        process.env.NTBA_FIX_319 = "1";
       
    
        this.bot.on('message', (msg) => {
            let Hi = "hi";
            if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
                this.msgId=msg.from.id
                this.bot.sendMessage(msg.from.id, "Hello " + msg.from.first_name + " what would you like to know about me ?");
            }
            
            let response = "Who are you";
            if (msg.text.toString().toLowerCase().includes("who")) {
                this.bot.sendMessage(msg.chat.id, "I am an intelligent telegram robot, built with Nest.js. Thanks for asking");
            }
            
            let response2 = "Do you love JavaScript";
            if (msg.text.toString().toLowerCase().includes("javascript")) {
                this.bot.sendMessage(msg.from.id, "Oh, did I hear you say JavaScript? \n I really love JavaScript");
            }
        });
        
    }

    notifyBOt(){
        this.bot.sendMessage('@slot121',"you will be notified here for slots");
    }

     callAll():Observable<any>{

        var dt=new Date();
        var str=dt.getDate()+1+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear();
        var url1="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=294&date="+str
        var url2="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=276&date="+str
        var url3="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=265&date="+str

        var urls = [url1, url2, url3];

        var calls=[];

        urls.forEach(url => {
          
                calls.push(this.http.get(url))
        });
       
        return forkJoin(calls)

        

      //  this.logger.debug(obj.data);
      

    }
    getSlot(url){
        return this.http.get(url)
          
    }


    getSlots(){
   
        try{
        var dt=new Date();
        var str=dt.getDate()+1+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear();
        var url1="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=294&date="+str
       
         return this.http.get(url1).pipe(
            map(response => response.data)
        );   
      }
      catch(ex){
        return ex;
      }

    }

    notify(dt:any){

        if(dt.length>0){
            dt.forEach(element => {
                var str="Address:"+element.address+"Pin:"+element.pincode+"dose1"+element.available_capacity_dose1+"dose2"+element.available_capacity_dose1
                var str="Address:"+element.address+"Pin:"+element.pincode+"dose1"+element.available_capacity_dose1+"dose2"+element.available_capacity_dose1
                this.bot.sendMessage('@slot121',str)
            });
           // this.bot.sendMessage('@slot121',"you will be notified here for slots");
        }

       

    }
}