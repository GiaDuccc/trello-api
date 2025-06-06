import express from 'express';
import { StatusCodes } from 'http-status-codes'; //Load Status ở thư viện http-status-codes
import { boardValidation } from '~/validations/boardValidation';
import { boardController } from '~/controllers/boardController';

const Router = express.Router(); // Tạo router

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list boards' });
  })
  .post(boardValidation.createNew, boardController.createNew);

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update) // update

export const boardRoute = Router;
