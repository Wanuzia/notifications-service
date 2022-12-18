import { KafkaConsumerService } from "./kafka-consumer.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [],
    providers: [KafkaConsumerService],
    controllers: [],
})
export class MessagingModule {}