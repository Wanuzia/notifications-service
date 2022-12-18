import { Kafka } from "kafkajs";
import { randomUUID} from "node:crypto"

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'kafka-producer',
        brokers: ['set-mink-5913-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'c2V0LW1pbmstNTkxMyTLJv9RUO4SSTMa0T6MInzNjdCiXwo5R9xGoGkWKwVJ78c',
            password: '***',
          },
          ssl: true,
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade',
                    category: 'social',
                    recipientId: randomUUID(),
                })
            },
        ],
    })
    await producer.disconnect()
}

bootstrap()