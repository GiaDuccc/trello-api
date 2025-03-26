import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

// Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null (vì chưa connect)
let trelloDatabaseInstance = null;

// Khỏi tạo 1 đối tượng mongoClientInstance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Lưu ý: Cái serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể không cần dùng nó,
  // còn nếu dùng nó là chúng ta sẽ chỉ định một cái Stable API Version của MongoDB
  // Đọc thêm ở đây: https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});


// Kết nối với Database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance;
  await mongoClientInstance.connect();
  // Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại vào biến
  // trelloDatabaseInstance ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

// Đóng kết nối tới database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

// Function GET_DB (không async) có nhiệm vụ export Trello Database Instance 
// sau khi đã kết nối thành công tới MongoDB, giúp sử dụng ở nhiều nơi khác trong code.
//
// Lưu ý: Chỉ gọi hàm GET_DB sau khi đã kết nối thành công tới MongoDB.
export const GET_DB = () => {
  // throw tương tự return (có khác 1 chút - tự tìm hiểu)
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!');
  return trelloDatabaseInstance;
};
