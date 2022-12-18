// decorator @injectable para fazermos injeção de dependências no Nestjs

import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService 
extends ServerKafka 
implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notification',
                brokers: ['set-mink-5913-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'c2V0LW1pbmstNTkxMyTLJv9RUO4SSTMa0T6MInzNjdCiXwo5R9xGoGkWKwVJ78c',
    password: '***',
  },
  ssl: true,
            }
        })
    }
   async onModuleDestroy() {
        await this.close();
    }
}