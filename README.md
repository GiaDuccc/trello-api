### Bộ code base để bắt đầu học khóa Full Stack MERN Pro (VIẾT CÁC REST API 

### Hướng dẫn clone Repo code này về máy các bạn chuẩn nhất ở video này:

- Cấu trúc dự án nâng cao, chuẩn thực tế, có Ba

### Requirements - Thông tin của bộ Code Base này - Chuẩn các phiên bản dưới đây để bắt đầu học: (Semantic Versioning)

```
* nodejs >= 18.16.0
* npm = v9.8.1
* yarn = v1.22.19

* "express": "^4.18.2"
* "nodemon": "^3.0.1"
* "eslint": "^8.47.0"

* "@babel/runtime": "^7.22.10"
* "@babel/cli": "^7.22.10"
* "@babel/core": "^7.22.10"
* "@babel/eslint-parser": "^7.22.10"
* "@babel/node": "^7.22.10"
* "@babel/plugin-transform-runtime": "^7.22.10"
* "@babel/preset-env": "^7.22.10"
* "babel-plugin-module-resolver": "^5.0.0"
```

### ---- Package-json.note ----start-----
```
{
  "name": "nodejs-expressjs-mongodb-base-project",
  "private": true,
  "version": "1.0.0",
  "author": "TrungQuanDev - Một Lập Trình Viên",
  "description": "https://youtube.com/@trungquandev",
  "engines": {
    "node": ">=18.x"
  },
  "scripts": {
    "lint":"eslint src --ext js--report-unused-disable-directives--max-warnings 0",
    // src --ext js: trỏ đến folder src rồi vào file js
    // --report-unused-disable-directives --max-warnings 0: Dùng để trả về lỗi, nếu có 10 lỗi sẽ trả về 10 lỗi - i guess =)

    "clean": "rm -rf build && mkdir build",
    -> dùng để xoá dữ liệu trong thư mục build

    "build-babel": "babel ./src -d ./build/src",
    -> Thường dùng để build ra bản latest (production), không đẩy lên github
   
    "build": "npm run clean && npm run build-babel",
    -> Gộp 2 lệnh là clean và build-babel
   
    "production": "npm run build && node ./build/src/server.js",
    -> Là bản sau khi đã lint rồi dùng để deploy
   
    "dev": "nodemon --exec babel-node ./src/server.js"  
    // giống với npm start
    // --exec babel-node: thực thi gói bable-node vào gói ./src/server.js
  },
  "dependencies": {
    "@babel/runtime": "^7.22.10",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.22.10",
    "@babel/core": "^7.22.10",
    "@babel/eslint-parser": "^7.22.10",
    "@babel/node": "^7.22.10",
    "@babel/plugin-transform-runtime": "^7.22.10",
    "@babel/preset-env": "^7.22.10",
    "babel-plugin-module-resolver": "^5.0.0",
    "eslint": "^8.47.0",
    "nodemon": "^3.0.1"
  }
}
```
### ---- package-json.note ----end-----


### ---- .Babelrc.note ----start-----
```
Để chạy được mấy cái sript có bable thì cần phải có cái babelrc này

{
  "presets": ["@babel/preset-env"], -> sử dụng gói presets env - build code chuẩn

  "plugins": [
    ["@babel/transform-runtime"],
    ["module-resolver", { "alias": { "~": "./src" } }]
    -> Xử lý relative import và absolute import
  ]
}
```
### ---- .Babelrc.note ----end-----


### ---- .Jsconfig.json.note ----start-----
```
-Cần phải có cái này thì mới có thể ctrl + click để đi đến thành phần đang trỏ đến hoặc url khi import 1 cái gì đó
-Dành riêng cho VS Code

{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"],
    },
  }
}
```
### ---- .Jsconfig.json.note ----end-----

### ---- DATABASE.note ----start-----
![Alt text](./image/image-database/Screenshot%202025-03-11%20113948.png)
### ---- DATABASE.note ----end-----

