/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import ApiError from '~/utils/ApiError';
import { StatusCodes } from 'http-status-codes';
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    // Xử lí logic dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    };

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard);
    // console.log(createdBoard);

    // Lấy bản ghi board sau khi gọi (tuỳ mục đích dự án mà có cần bước này hay không)
    const getNewBoard = await boardModel.findOnebyId(createdBoard.insertedId);
    // console.log(getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vv
    // Bắn email, notification về cho admin khi có 1 cái board mới được tạo...vv

    return getNewBoard;
    // Trả kết quả về trong Service
    // Luôn phải có return
  } catch (error) { throw error; }
}

const getDetails = async (boardId) => {
  try {

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const board = await boardModel.getDetails(boardId);

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    // B1: Deep Clone board ra một cái mới để xử lý, không ảnh hưởng đến board ban đầu, tuỳ mục đích về sau mà có cần clone hay không ( vid 63 giải thích)
    const resBoard = cloneDeep(board)

    // B2: Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // Cần phải so sánh để lấy đúng card vì có thể FE trả về card lẫn lộn, (i guess)

      // Cách .equals() có thể hiểu được ObjectId, MongoDB có support .equals()
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // Cách khác đơn giản là convert ObjectId về String bằng hàm toString của JS
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // B3: Xoá mảng cards khỏi board ban đầu
    delete resBoard.cards

    return resBoard;
    // Trả kết quả về trong Service
    // Luôn phải có return
  } catch (error) { throw error; }
}

export const boardService = {
  createNew,
  getDetails
};