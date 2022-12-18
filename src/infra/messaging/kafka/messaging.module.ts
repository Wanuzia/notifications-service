import { DatabaseModule } from "../../database/database.module";
import { SendNotification } from "../../../application/use-cases/send-notification";
import { NotificationsController } from "./controllers/notifications.controller";
import { KafkaConsumerService } from "./kafka-consumer.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule],
    providers: [
        KafkaConsumerService,
        SendNotification,
    ],
    controllers: [NotificationsController],
})
export class MessagingModule {}