import { Content } from '../../../../application/entities/content';
import { Notification } from '../../../../application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}

// método static para não ter que instanciar a classe;
//Os mappers possibilitam reaproveitamento de código, dissociando-o das camadas da application.
// Neste exemplo, o método estático toPrisma recebe a notificação entidade, da camada de Notificação,
// e converte para o formato que o prisma precisa utilizar a nossa notificação. O mesmo para todos os métodos aqui criados.
