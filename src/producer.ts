import amqb, { Channel } from "amqplib";
import { EXCHANGE_NAME, RABBITN_URL } from "./config";


export class Producer{
   public channel: Channel | null = null;

   async createChannel(){
      const connection = await amqb.connect(RABBITN_URL);
      this.channel = await connection.createChannel();
   }

   async publishMessage(routingKey: string, message: string){
      if(!this.channel){
         await this.createChannel();
      }

      await this.channel?.assertExchange(EXCHANGE_NAME, "direct")

      await this.channel?.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify({
         logType: routingKey,
         message: message,
         dateTime: new Date(),
      })))

      console.log(`The new ${routingKey} log is sent to exchange ${EXCHANGE_NAME}`);
   }
}