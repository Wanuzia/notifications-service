import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from '../use-cases/count-recipient-notifications';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('Count notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const CountNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await CountNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
// Martin Fowler in memory database
