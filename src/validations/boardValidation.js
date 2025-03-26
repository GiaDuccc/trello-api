import Joi from 'joi';
import { StatusCodes } from 'http-status-codes'; //Load Status ở thư viện http-status-codes
import ApiError from '~/utils/ApiError';
import { BOARD_TYPES } from '~/utils/constants';

const createNew = async (req, res, next) => {
  /**
    -Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho Front-end tự validate và custom message phía FE cho đẹp.
    -Back-end chỉ cần validate Đảm Bảo Dữ Liệu Chuẩn Xác, và trả về message mặc định từ thư viện là được.
    -Quan trọng: Việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vì đây là điểm cuối để lưu trữ dữ
    liệu vào Database.
    -Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end
    và Front-end nhé.
  */


  // Dạng bộ quy tắc dữ liệu schema dùng để kiểm tra và xác thực một đối tượng (object)
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (giaduc)',
      'string.empty': 'Title is not allowed to be empty (giaduc)',
      'string.min': 'Title min 3 chars (giaduc)',
      'string.max': 'Title max 50 chars (giaduc)',
      'string.trim': 'Title must not have leading or trailing whitespace'
    }),
    // Nếu không có strict() thì sẽ bắt lỗi khi chạy đến try catch, có strict() thì sẽ bắt lõi luôn
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation sẽ trả về tất cả lỗi
    // abortEarly: false: khi có lỗi có dừng sớm luôn không

    next();
    /* Công dụng của hàm next():
      .post(boardValidation.createNew, boardController.createNew);
      Ở trong hàm post ở file boardRoute sau khi gọi xong boardValidate hợp lệ thì
      hàm next() sẽ next đến boardController
    */

  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage);
    next(customError);
    // UNPROCESSABLE_ENTITY mã 422, thường dùng cho việc validate dữ liệu
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // });
  }
};

export const boardValidation = {
  createNew
};