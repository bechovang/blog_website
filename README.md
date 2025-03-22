# Blog Website Application

A full-featured blog website application built with **Java Spring Boot** (backend) and **React** (frontend), supporting user authentication, post creation, commenting, and real-time chat.

## 🚀 Features  
- 📝 **Post Management** – Create and delete blog posts. *(Implemented, editing not available yet)*  
- 💬 **Comment System** – Engage with posts through comments. *(Implemented)*  
- 📂 **Image Uploads** – Upload and attach images to posts via Cloudinary. *(Implemented, file uploads not available yet)*  
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
- Cloudinary for image storage

### **Frontend:**
- React
- Axios (API calls)
- Bootstrap (Styling)
- TailwindCSS (Work in Progress)

### **Deployment:**
- Docker (Containerization)
- Render (Hosting)  

## 📸 Screenshots

### **Homepage**
![Homepage](screenshots/homepage.png)

### **Post Creation**
![Create Post](screenshots/create_post.png)

### **Comment System**
![Comments](screenshots/comments.png)

### **User Authentication** *(Planned)*
![Login](screenshots/login.png)

### **Real-time Chat** *(Planned)*
![Chat](screenshots/chat.png)

## 📦 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/blog-website.git
cd blog-website
```

### **2. Set Up the Database**
1. **Open PostgreSQL via terminal/cmd:**
   ```bash
   psql -U postgres
   ```
   (Enter password if prompted)

2. **Check if database exists:**
   ```sql
   \l
   ```

3. **Create the database `blogdb` if it doesn't exist:**
   ```sql
   CREATE DATABASE blogdb;
   ```

4. **Exit PostgreSQL:**
   ```sql
   \q
   ```

### **3. Configure `application.properties`**
Update `application.properties` in `backend/src/main/resources`:

```properties
spring.application.name=blog
spring.datasource.url=jdbc:postgresql://localhost:5432/blogdb
spring.datasource.username=...   # Replace with your username
spring.datasource.password=... # Replace with your password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=update
spring.web.resources.static-locations=file:uploads/
server.address=0.0.0.0
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
cloudinary.cloud-name=...  # Replace with your Cloudinary details
cloudinary.api-key=...
cloudinary.api-secret=...
```

### **4. Setup Backend**
```bash
mvn spring-boot:run
```
_Backend runs at: `http://localhost:8080`_

### **5. Setup Frontend**
```bash
npm install
npm start
```
_Frontend runs at: `http://localhost:3000`_

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

