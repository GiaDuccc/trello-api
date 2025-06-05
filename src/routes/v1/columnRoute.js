import express from 'express';
import { columnValidation } from '~/validations/columnValidation';
import { columnController } from '~/controllers/columnController';

const Router = express.Router(); // Tạo router

Router.route('/')
  .post(columnValidation.createNew, columnController.createNew);

Router.route('/:id')
  .put(columnValidation.update, columnController.update) // update

export const columnRoute = Router;