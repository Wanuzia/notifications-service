import { CancelNotification } from '../use-cases/cancel-notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../use-cases/erros/notification-not-found';
import { makeNotification } from '../../../test/factories/notification-factory';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to cancel a not existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
// Martin Fowler in memory database
