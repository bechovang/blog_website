
# Blog Website Application

A full-featured blog website application built with **Java Spring Boot** (backend) and **React** (frontend), supporting user authentication, post creation, commenting, and real-time chat.

## 🚀 Features  
- ✅ **User Authentication** – Register & login securely with JWT authentication. *(Implemented)*
- 📝 **Post Management** – Create, edit, and delete blog posts. *(Implemented)*
- 💬 **Comment System** – Engage with posts through comments. *(Implemented)*
- 📡 **Real-time Chat** – WebSocket-based chat functionality. *(Planned)*
- 📂 **File & Image Uploads** – Upload and attach images/files to posts. *(Planned)*
- 🎨 **Modern UI** – Built with React & TailwindCSS. *(Work in Progress)*  

## 🛠 Tech Stack

### **Backend:**
- Java + Spring Boot
- PostgreSQL
- WebSockets for real-time chat *(Planned)*
- JWT for authentication *(Implemented)*

### **Frontend:**
- React
- Axios (API calls)
- TailwindCSS (Styling) *(Work in Progress)*

### **Deployment:**
- Docker (Containerization) *(Planned)*
- Heroku / Vercel (Hosting) *(Planned)*  

## 📦 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/blog-website.git
cd blog-website
```

### **2. Setup Backend**
```bash
cd backend
mvn spring-boot:run
```
_Backend will start running at: `http://localhost:8080`_

### **3. Setup Frontend**
```bash
cd frontend
npm install
npm start
```
_Frontend will be available at: `http://localhost:3000`_

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
