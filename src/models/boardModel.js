import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb';
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel';
import { cardModel } from './cardModel';

// Define Collection (Name & Schema)
const BOARD_COLLECTION_NAME = 'boards';
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  // slug không cần thêm max vì nó dựa vào title từ đó sinh ra thêm
  // các gạch ngang ở giữa nên khá dài
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  // Đã được xoá hay chưa
  _destroy: Joi.boolean().default(false)
});

const validateBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData);
    return createdBoard;
  } catch (error) {
    throw new Error(error);
  }
}

const findOnebyId = async (id) => {
  try {
    return await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
  } catch (error) {
    throw new Error(error);
  }
}
// Queru tổng hợp (aggregate) để lấy toàn bộ Columns và Cards thuộc về Board
const getDetails = async (id) => {
  try {
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      // $match → Dùng để lọc dữ liệu trong MongoDB Aggregation Pipeline, tương tự như find()
      // Lọc những _id chưa _destroy khớp với id, chuyển id sang object để so sánh chính xác
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from: columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id', // Kiểu khoá chính
        foreignField: 'boardId', // khoá ngoại
        as: 'columns'
      } },
      { $lookup: {
        from: cardModel.CARD_COLLECTION_NAME,
        localField: '_id', // Kiểu khoá chính
        foreignField: 'boardId', // khoá ngoại
        as: 'cards'
      } }
    ]).toArray()
    // vì id là unique nên mảng trả về chỉ có 1 phần tử nên return result[0]
    return result[0] || {}
  } catch (error) {
    throw new Error(error);
  }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOnebyId,
  getDetails
};

