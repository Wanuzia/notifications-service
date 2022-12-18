import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '../use-cases/erros/notification-not-found';
import { makeNotification } from '../../../test/factories/notification-factory';
import { ReadNotification } from '../use-cases/read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not to be able to read a not existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
// Martin Fowler in memory database
