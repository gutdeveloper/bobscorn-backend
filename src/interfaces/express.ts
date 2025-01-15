import * as express from 'express';

export interface Express {
    getExpress(): express.Express;
    listen(): void;
    stop(): void;
}