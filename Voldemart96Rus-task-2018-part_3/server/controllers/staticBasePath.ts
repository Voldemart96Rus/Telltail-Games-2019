import {Request, Response} from 'express';

export async function getStaticBasePath(_req: Request, res: Response) {
    const {staticBasePath} = res.locals;
    res.json(staticBasePath);
}
