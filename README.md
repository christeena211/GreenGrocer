 GreenGrocer

A full-stack grocery web application with a React frontend and Node.js/Express/MongoDB backend.

 Packages Used

 Server (Backend)
- express
- mongoose
- cors
- dotenv

 Client (Frontend)
- react
- react-dom
- vite

 How to Run the App

 1. Clone the repository
  
git clone https://github.com/christeena211/GreenGrocer.git
cd GreenGrocer
  

 2. Set up the Server
  
cd Server
npm install
  

- Create a `.env` file in the `Server` directory with your MongoDB connection string:
    
  mongodb_url=YOUR_MONGODB_ATLAS_CONNECTION_STRING
    

- Start the backend server:
  
npm start
  

The server will run on [http://localhost:5000](http://localhost:5000)

 3. Set up the Client
  
cd ../Client
npm install
npm run dev
  

The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port)

---

 Features
- User registration and login
- Product listing and filtering
- Admin and seller dashboards
- Shopping cart

---

 Notes
- Make sure MongoDB Atlas credentials are correct in your `.env` file.
- The `.env` file is ignored by git for security.
 GreenGrocer