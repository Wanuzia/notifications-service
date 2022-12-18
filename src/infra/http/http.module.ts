import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { ReadNotification } from '../../application/use-cases/read-notification';
import { CancelNotification } from '../../application/use-cases/cancel-notification';
import { UnreadNotification } from '../../application/use-cases/unread-notifications';
import { CountRecipientNotification } from '../../application/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '../../application/use-cases/get-recipient-notifications';


@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification
  ]
})
export class HttpModule {}
