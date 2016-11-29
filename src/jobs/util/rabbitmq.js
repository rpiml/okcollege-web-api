import { connect as rabbitmqConnect } from 'amqplib/callback_api';

function createRabbitMQConnection(){
  return new Promise(resolve => {
    rabbitmqConnect('amqp://rabbitmq:rabbitmq@127.0.0.1', (err, conn) => {
      resolve(conn);
    });
  });
}
export let onRabbitMQConnection = createRabbitMQConnection();
export const getRabbitMQConnection = () => onRabbitMQConnection;
