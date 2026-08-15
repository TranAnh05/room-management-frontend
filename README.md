# Room Management Frontend

Dự án Room Management Frontend là giao diện web hiện đại dành cho hệ thống quản lý phòng trọ và khách thuê phòng. Dự án được thiết kế dưới dạng ứng dụng đơn trang (SPA) với giao diện trực quan, thân thiện, hỗ trợ tối ưu các tác vụ quản lý phòng, thành viên thuê phòng và lịch sử thuê.

## Công nghệ sử dụng

- Thư viện chính: React 19
- Công cụ build: Vite 8
- Giao diện và Styling: Tailwind CSS v4
- Quản lý State: Zustand v5
- HTTP Client: Axios
- Bản đồ vị trí: Leaflet và React Leaflet
- Quản lý Form: React Hook Form
- Hệ thống thông báo: React Toastify
- Điều hướng: React Router DOM v7

## Các chức năng chính

- Xác thực và phân quyền: Đăng nhập hệ thống, bảo vệ các trang quản trị (ProtectedRoute), tự động đăng xuất khi phiên làm việc hết hạn.
- Quản lý bất động sản (Property): Thêm mới, chỉnh sửa, hiển thị danh sách bất động sản và tích hợp bản đồ định vị.
- Quản lý phòng trọ (Rooms): Tạo mới, sửa đổi thông tin phòng, hiển thị thẻ phòng trực quan và theo dõi chi tiết lịch sử thuê phòng.
- Quản lý khách thuê (Tenants): Quản lý thông tin khách thuê chính và các thành viên ở cùng phòng.
- Tiện ích khác: Bộ lọc tìm kiếm nhanh, phân trang danh sách dữ liệu linh hoạt và hiển thị thông báo lỗi/thành công tập trung.

## Hướng dẫn cài đặt và sử dụng

### Yêu cầu hệ thống

- Node.js (phiên bản khuyến nghị LTS)
- Trình quản lý gói npm (đi kèm khi cài đặt Node.js)

### Các bước cài đặt

1. Di chuyển vào thư mục dự án:
   ```bash
   cd room-management-frontend
   ```

2. Cài đặt toàn bộ các thư viện phụ thuộc:
   ```bash
   npm install
   ```

### Lệnh khởi chạy chương trình

- Khởi chạy môi trường phát triển (Development Server):
  ```bash
  npm run dev
  ```
  Ứng dụng sẽ được khởi chạy tại địa chỉ mặc định `http://localhost:5173` (hoặc cổng khác tùy thuộc vào terminal hiển thị).

- Biên dịch dự án cho môi trường sản xuất (Build Production):
  ```bash
  npm run build
  ```
  Sản phẩm tối ưu hóa sau khi build sẽ được lưu trữ trong thư mục `dist`.

- Chạy thử bản build production trên máy local (Preview):
  ```bash
  npm run preview
  ```

- Kiểm tra và sửa lỗi cú pháp code (Linting):
  ```bash
  npm run lint
  ```

## Cấu trúc thư mục dự án

- src/main.jsx: Điểm khởi chạy của ứng dụng, cấu hình router và hệ thống thông báo toast toàn cục.
- src/App.jsx: Định nghĩa các tuyến đường (routes) và cơ chế bảo vệ quyền truy cập.
- src/apis/: Chứa các hàm giao tiếp API tập trung kết nối với backend.
- src/components/: Thư mục chứa các thành phần UI dùng chung và các component nghiệp vụ (Properties, Rooms, Tenants...).
- src/pages/: Chứa các trang giao diện tương ứng với cấu trúc định tuyến (Auth, Property, Room...).
- src/stores/: Quản lý trạng thái đăng nhập và thông tin người dùng qua Zustand store (lưu trữ lâu dài qua persist middleware).
- src/utils/: Chứa các cấu hình Axios client, hằng số cấu hình hệ thống (constants.js) và các hàm định dạng ngày tháng/tiền tệ (formatters.js).
