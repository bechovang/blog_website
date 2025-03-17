# Blog Website Application

A full-featured blog website application built with **Java Spring Boot** (backend) and **React** (frontend), supporting user authentication, post creation, commenting, and real-time chat.

## 🚀 Features  
- 📝 **Post Management** – Create and delete blog posts. *(Implemented, editing not available yet)*  
- 💬 **Comment System** – Engage with posts through comments. *(Implemented)*  
- 📂 **Image Uploads** – Upload and attach images to posts. *(Implemented, file uploads not available yet)*  
- 🎨 **Modern UI** – Built with React & Bootstrap for a cleaner, responsive design. *(Implemented, further improvements ongoing)*  
- 🔜 **Planned Features**:  
  - ✅ **User Authentication** – Register & login securely with JWT authentication.  
  - 📡 **Real-time Chat** – WebSocket-based chat functionality.  
  - 📝 **Post Editing** – Allow users to edit their blog posts.  
  - 📂 **File Uploads** – Support for additional file formats beyond images.  
  - 👍 **Like System** – Allow users to like posts.  
  - 🔍 **Post Filtering** – Filter posts by date and tags.  
  - 🎨 **TailwindCSS UI** – Transition to TailwindCSS for a more customizable design.  

## 🛠 Tech Stack

### **Backend:**
- Java + Spring Boot
- PostgreSQL
- WebSockets for real-time chat *(Planned)*
- JWT for authentication *(Planned)*

### **Frontend:**
- React
- Axios (API calls)
- TailwindCSS (Styling) *(Work in Progress)*

### **Deployment:**
- Docker (Containerization) *(Planned)*
- Heroku / Vercel / Render (Hosting) *(Implemented)*  

## 📦 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/blog-website.git
cd blog-website
```

### **2. Tạo và Cấu hình Database**
1. **Mở PostgreSQL bằng terminal/cmd:**
   ```bash
   psql -U postgres
   ```
   (Nhập mật khẩu nếu có)

2. **Kiểm tra database có tồn tại không:**
   ```sql
   \l
   ```

3. **Nếu chưa có database `blog_db`, tạo nó:**
   ```sql
   CREATE DATABASE blogdb;
   ```

4. **Thoát PostgreSQL:**
   ```sql
   \q
   ```

### **3. Cấu hình `application.properties`**
Cập nhật file `application.properties` trong thư mục `backend/blog/src/main/resources` với các thông tin sau:

```properties
spring.application.name=blog
spring.datasource.url=jdbc:postgresql://localhost:5432/blogdb
spring.datasource.username=postgres   # Thay bằng username của bạn
spring.datasource.password=phuc2006   # Thay bằng password của bạn
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=update
spring.web.resources.static-locations=file:uploads/
server.address=0.0.0.0
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### **4. Setup Backend**
```bash
mvn spring-boot:run
```
_Backend sẽ chạy tại: `http://localhost:8080`_

**📌 Lưu ý:** Chạy lệnh này trong thư mục `blog-website/backend/blog`.

**📌 Lưu ý:** Nếu sử dụng IntelliJ IDEA, mở project từ **`blog-website/backend`** trước khi chạy lệnh.

### **5. Setup Frontend**
```bash
npm install
npm start
```
_Frontend sẽ chạy tại: `http://localhost:3000`_

**📌 Lưu ý:** Chạy lệnh này trong thư mục `blog-website/frontend/blog-frontend`.

## 🌍 Deployment on Render

- **Backend**: `https://blog-website-oanh.onrender.com`
- **Frontend**: `https://blog-website-frontend-shku.onrender.com`

## 📡 API Endpoints

| Method | Endpoint           | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/posts`      | Get all posts      |
| GET    | `/api/posts/{id}` | Get a single post  |
| POST   | `/api/comments`   | Create a comment   |

## 🤝 Contributing  
Pull requests are welcome! Follow these steps:  
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Commit your changes (`git commit -m "Added new feature"`)  
4. Push the branch (`git push origin feature-branch`)  
5. Submit a Pull Request  

## 📜 License  
This project is licensed under the **MIT License**.

---

**Made with ❤️ by Ngọc Phúc**
[DOCS]([url](https://docs.google.com/document/d/1Ay7-5QRVyjRHuKJzAoeOU7zLcS4x_ZDMWRewdg0gcm4/edit?tab=t.0))
