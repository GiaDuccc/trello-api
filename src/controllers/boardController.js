import { StatusCodes } from 'http-status-codes'; //Load Status ở thư viện http-status-codes
import { boardService } from '~/services/boardService';

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body);
    // console.log('req.query: ', req.query);
    // console.log('req.params: ', req.params);
    // console.log('req.files: ', req.files);
    // console.log('req.cookies: ', req.cookies);
    // console.log('req.jwtDecoded: ', req.jwtDecoded);

    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body);

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
    /**
      - Tác dụng của next(error):
      Khi có lỗi, bất kì lỗi nào đều sẽ chạy cái middleware xử lí lỗi tập trung
      ở file server.js
    */
  }
}

export const boardController = {
  createNew
};
