import express from 'express'
import multer from 'multer';
import DomainModel from '../models/domain.model';
import { SimpleCallback, One } from '../types/Types';
const fs = require('fs');
const csv = require('csv-stream')
const router = express.Router();
const amqp = require('amqplib/callback_api');
const Constans = require('../common/types');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')

router.route('/').post((req, res) => {

    upload(req, res, (err: any) => {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        }

        let filePath = req.file.path;

        emptyDomainsTable(() => handleParse(filePath));
        
        return res.status(200).send(req.file);
        // Everything went fine.
    })
});

function emptyDomainsTable(callBack: SimpleCallback) {
    DomainModel.removeAll((err, data) => {
        if (err) {
            throw err;
        }

        callBack();
    });
}

function handleParse(filePath: string) {
    fs.createReadStream(filePath)
        .on('error', () => {
            // handle error
        })
        .pipe(
            csv.createStream({
                endLine : '\n',
                escapeChar : '"',
                enclosedChar : '"'
            })
            )
        .on('data', (row: string) => {
            sendQueue(row);
        })
        .on('end', () => {
            setTimeout(() => {
                fs.unlinkSync(filePath);
            }, 5000);
        })
}

function sendQueue(msg: string) {

    let sendMsg = JSON.stringify(msg);
    amqp.connect('amqp://localhost', function (error0: any, connection: any) {
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

            channel.sendToQueue(queue, Buffer.from(sendMsg));
        });
    });
}

export default router;