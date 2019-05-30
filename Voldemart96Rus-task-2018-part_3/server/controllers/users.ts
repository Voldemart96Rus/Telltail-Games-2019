import {Request, Response} from 'express';

import md5 from 'md5';
import {User} from 'tables/User';

export function authorize(req: Request, res: Response) {
    const {login, password} = req.body;
    User.findOne({where: {login}})
    .then(salt => {
        if (salt === null) {
            res.sendStatus(403);
        } else  {
        console.info(md5(password + salt.salt));
        User.findOne({where: {login, password: md5(password + salt.salt)}}).then(result => {
            if (result === null) {
                res.sendStatus(403);
            } else {
                res.json({result: md5(password + salt.salt)});
            }
        });
    }
    });
}

export function register(req: Request, res: Response) {
    const {avatar, login, password, salt} = req.body;

    User.findOne({where: {login}}).then(result => {
        if (result === null) {
            User.create({
                avatar,
                login,
                password,
                salt
            }).then(() => res.sendStatus(201));
        } else {
            res.sendStatus(403);
        }
    });
}

export async function user(req: Request, res: Response) {
    const url = new URL('https://' + req.url);
    const login = String(url.searchParams.get('login'));
    await User.findOne({where: {login}})
        .then((result: any | null) => {
            res.json(result);
        });
}
