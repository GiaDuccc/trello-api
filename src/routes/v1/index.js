import express from 'express';
import { StatusCodes } from 'http-status-codes'; //Load Status ở thư viện http-status-codes
import { boardRoute } from '~/routes/v1/boardRoute';

const Router = express.Router(); // Tạo router

// Check API V1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' });
});

// Board API - các API liên quan đến board
Router.use('/boards', boardRoute)

export const APIs_V1 = Router;