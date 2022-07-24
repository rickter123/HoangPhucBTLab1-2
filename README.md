#Run app:
nodemon server.js

- POST /api/contacts : tạo một liên hệ (contact) mới
{
    "name": "payload.name",
    "email": "payload.email",
    "address": "payload.address",
    "phone": "095559999",
    "favorite": false,
    "company": "payload.company"
}
- GET /api/contacts : trả về tất cả các liên hệ trong CSDL

- DELETE /api/contacts : xóa tất cả các liên hệ

- GET /api/contacts/favorite : trả về các liên hệ được yêu thích

- GET /api/contacts/<contact-id> : trả về thông tin một liên hệ dựa trên id

- PUT /api/contacts/<contact-id> : cập nhật một liên hệ dựa trên id

- DELETE /api/contacts/<contact-id> : xóa một liên hệ dựa trên id

- Yêu cầu đến URL không được định nghĩa : thông báo lỗi 404 "Resource not found"
