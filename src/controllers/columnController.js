import { StatusCodes } from 'http-status-codes'; //Load Status ở thư viện http-status-codes
import { columnService } from '~/services/columnService';

const createNew = async (req, res, next) => {
  try {
    const createdColumn = await columnService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdColumn);
  } catch (error) {
    next(error);
  }
}

const update = async (req, res, next) => {
  try {
    const columnId = req.params.id

    // Điều hướng dữ liệu sang tầng Service
    const updatedColumn = await columnService.update(columnId, req.body);

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
}

export const columnController = {
  createNew,
  update
};
