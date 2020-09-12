const amqp = require('amqplib/callback_api');
const Constans = require('./types');
const isValidDomain = require('is-valid-domain');
import DomainModel  from '../models/domain.model';
const Utils = require('./utils');

module.exports.receiveQueue = () => amqp.connect('amqp://localhost', function (error0: any, connection: any) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1: any, channel: any) {
        if (error1) {
            throw error1;
        }

        var queue = Constans.RQ_CSV_BROKER;

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function (msg: any) {

            let obj = JSON.parse(msg.content.toString());

            // if name and date not set
            // for (var key in obj) {
            //     console.log(`Domain: ${obj[key]}`);
            // }
            // console.log(`name: ${obj.name}, date: ${obj.date}`);

            let domain = new DomainModel(
                obj.name,
                Utils.dateDbFormat(obj.date),
                isValidDomain(obj.name)
            );

            domain.create(domain, (err, data) => {
                if (err) {
                    throw err;
                }
            });

        }, {
            noAck: true
        });
    });
});
