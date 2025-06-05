import { columnModel } from '~/models/columnModel';
import { boardModel } from '~/models/boardModel';

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    };
    const createdColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOnebyId(createdColumn.insertedId);

    if (getNewColumn) {
      // Xử lý cấu trúc data ở đây trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật lại mảng ColumnOrderIds trong collection Boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn;
  } catch (error) { throw error; }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const updatedColumn = await columnModel.update(columnId, updateData);

    return updatedColumn;
  } catch (error) { throw error; }
}

export const columnService = {
  createNew,
  update
};