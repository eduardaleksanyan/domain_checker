import express from 'express'
import DomainModel from '../models/domain.model';
const router = express.Router();

router.route('/').get((req, res) => {

    let page:number = Number(req.query.page);
    let limit:number = Number(req.query.limit);

    DomainModel.getDomains(page, limit, (err: any, data: any) => {
        if (err) {
            res.send({}).status(500);
        }

        res.send(data);
    })
})

router.route('/count').get((req, res) => {
    DomainModel.getDomainCount((err: any, data: any) => {
        if (err) {
            res.send({}).status(500);
        }

        res.send(data);
    })
})

export default router;