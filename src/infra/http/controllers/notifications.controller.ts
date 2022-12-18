import { NotificationViewModelMapper } from '../../../infra/http/view-models/notification-view-model';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Patch } from '@nestjs/common';
import { CancelNotification } from '../../../application/use-cases/cancel-notification';
import { ReadNotification } from '../../../application/use-cases/read-notification';
import { UnreadNotification } from '../../../application/use-cases/unread-notifications';
import { CountRecipientNotification } from '../../../application/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '../../../application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }
  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{ count: number }> {
    const count = await this.countRecipientNotification.execute({
      recipientId,
    });
    return count
  }
  @Get('from/:recipientId')
  async getFromRecipientId(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModelMapper.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return {
      notification: NotificationViewModelMapper.toHttp(notification),
    };
  }
}
