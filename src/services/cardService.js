import { cardModel } from '~/models/cardModel';
import { columnModel } from '~/models/columnModel';

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody
    };
    const createdCard = await cardModel.createNew(newCard);
    const getNewCard = await cardModel.findOnebyId(createdCard.insertedId);

    if (getNewCard) {
      // Cập nhật lại mảng CardOrderIds trong collection Columns
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard;
  } catch (error) { throw error; }
}
export const cardService = {
  createNew
};