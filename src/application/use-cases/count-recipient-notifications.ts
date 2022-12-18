import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface ICountRecipientNotificationRequest {
  recipientId: string;
}

type ICountRecipientNotificationResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ICountRecipientNotificationRequest,
  ): Promise<ICountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
