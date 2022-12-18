import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Notification } from '../entities/notification';

interface IGetRecipientNotificationRequest {
  recipientId: string;
}

type IGetRecipientNotificationResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: IGetRecipientNotificationRequest,
  ): Promise<IGetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
