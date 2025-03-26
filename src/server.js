import express from 'express'; // Load Express để chạy server
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'; // Load async-exit-hook để sử dụng exitHook
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'; // Load Database từ mongodb.js
import { env } from '~/config/environment'; //Load env từ file environment để sử dụng các biến môi trường
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware';

const START_SERVER = () => {
  const app = express();

  // Enable req.body json data
  app.use(express.json());

  // Xử lí CORS
  app.use(cors(corsOptions))

  // Use APIs v1
  app.use('/v1', APIs_V1) // Sử dụng APIs_V1 cho cái (trang chủ)/v1

  // Middleware xử lí lỗi tập trung
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`);
  });

  // Thực hiện các tác vụ cleanup trước khi dừng server
  // Đọc thêm ở đây: https://stackoverflow.com/q/14031763/8324172
  exitHook( () => {
    console.log('server is shutting down');
    CLOSE_DB();
    console.log('disconnected');
  });
};

// Cách 1:
// CONNECT_DB() trả về promise nên có thể dùng .then, catch ...
// Chỉ khi kết nối tới Database thành công thì mới start Server Back-end lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MonggoDB Cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch(error => {
//      console.log(error);
//      process.exit(0); // Dừng chương trình
//    })

// Cách 2:
// Chỉ khi kết nối tới Database thành công thì mới start Server Back-end lên
// Immediately invoked / Anonymous Async Functions (IIFE)
(async () => {
  try {
    console.log('connecting to cloud atlas');
    await CONNECT_DB();
    console.log('connected to cloud atlas');
    // Khởi động server Back-end sau khi connect database thành công
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();