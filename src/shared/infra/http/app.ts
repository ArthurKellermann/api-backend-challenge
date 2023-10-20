import 'reflect-metadata';
import express from 'express';
import { resolve } from 'path';
import { router } from './routes';
import { config } from 'dotenv';

config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  private routes() {
    this.app.use(router);
  }
}

export default new App().app;
