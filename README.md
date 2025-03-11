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
    "lint": "eslint src --ext js --report-unused-disable-directives --max-warnings 0",
    // src --ext js: trỏ đến folder src rồi vào file js
    // --report-unused-disable-directives --max-warnings 0: Dùng để trả về lỗi, nếu có 10 lỗi sẽ trả về 10 lỗi - i guess =))
    "clean": "rm -rf build && mkdir build",
    "build-babel": "babel ./src -d ./build/src",
    "build": "npm run clean && npm run build-babel",
    "production": "npm run build && node ./build/src/server.js",
    "dev": "nodemon --exec babel-node ./src/server.js"
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
### ---- package-json.note ----end-----
