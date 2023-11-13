const chai = require('chai');
const http = require('http');
const fs = require('fs');
const app = require('./app'); // Giả sử app.js của bạn xuất logic server

const expect = chai.expect;

describe('Server', () => {
  it('nên phản hồi với mã trạng thái 200 OK và nội dung HTML hợp lệ cho đường dẫn gốc', (done) => {
    const server = http.createServer(app);

    // Tạo một yêu cầu đến đường dẫn gốc
    http.get('http://localhost:3000/', (res) => {
      // Kiểm tra mã trạng thái
      expect(res.statusCode).to.equal(200);

      // Kiểm tra loại nội dung
      expect(res.headers['content-type']).to.equal('text/html');

      // Đọc dữ liệu phản hồi
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // Kiểm tra dữ liệu phản hồi
      res.on('end', () => {
        // Thêm kiểm tra nội dung cụ thể của bạn ở đây
        // Ví dụ, bạn có thể kiểm tra xem phản hồi có chứa một chuỗi hoặc cấu trúc HTML cụ thể không
        expect(responseData).to.include('Nội dung mong đợi của bạn');

        server.close();
        done();
      });
    });
  });

  it('nên phản hồi với mã trạng thái 500 Internal Server Error cho một đường dẫn tệp không hợp lệ', (done) => {
    const server = http.createServer(app);

    // Tạo một yêu cầu đến một đường dẫn không hợp lệ
    http.get('http://localhost:3000/invalid', (res) => {
      // Kiểm tra mã trạng thái
      expect(res.statusCode).to.equal(500);

      // Kiểm tra loại nội dung
      expect(res.headers['content-type']).to.equal('text/plain');

      // Đọc dữ liệu phản hồi
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // Kiểm tra dữ liệu phản hồi
      res.on('end', () => {
        // Thêm kiểm tra thông báo lỗi cụ thể của bạn ở đây
        // Ví dụ, bạn có thể kiểm tra xem phản hồi có chứa một thông báo lỗi mong đợi không
        expect(responseData).to.equal('Internal Server Error');

        server.close();
        done();
      });
    });
  });
});

