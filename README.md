<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>

  <h1>Appointment Management System</h1>

  <p>A Node.js-based backend system that facilitates appointment booking between students and professors. This system features secure user authentication, appointment scheduling, availability management, and role-based access control.</p>

  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li><strong>Backend Framework:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB (Mongoose)</li>
    <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
    <li><strong>Password Hashing:</strong> bcrypt</li>
    <li><strong>Environment Management:</strong> dotenv</li>
    <li><strong>API Testing:</strong> Postman</li>
  </ul>

  <h2>📂 Features</h2>
  <ul>
    <li>👨‍🎓 Student Registration/Login</li>
    <li>👨‍🏫 Professor Registration/Login</li>
    <li>📅 Set Professor Availability</li>
    <li>📌 Book Appointments by Students</li>
    <li>❌ Cancel Appointments by Professors</li>
    <li>🔒 Role-Based Access Control with Middleware</li>
  </ul>

  <h2>📦 Folder Structure</h2>
  <pre><code>
Appointment-Management-System
├── Models/             # Mongoose schemas
├── Routes/             # Auth, Availability, Appointment routes
├── Middleware/         # Authentication middleware
├── DATABASE/           # MongoDB connection logic
├── .env                # Environment variables
├── main.js             # Entry point
└── README.md           # Project documentation
  </code></pre>

  <h2>🔑 Environment Variables</h2>
  <p>Create a <code>.env</code> file in the root:</p>
  <pre><code>
PORT=3000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
  </code></pre>

  <h2>🚀 Getting Started</h2>
  <ol>
    <li><strong>Clone the repository:</strong><br>
      <code>git clone https://github.com/its-ks/Appointment-Management-System-Backend.git</code>
    </li>
    <li><strong>Install dependencies:</strong><br>
      <code>npm install</code>
    </li>
    <li><strong>Setup your .env file</strong></li>
    <li><strong>Start the server:</strong><br>
      <code>npm start</code>
    </li>
  </ol>

  <h2>📮 API Endpoints (Postman)</h2>
  <table>
    <thead>
      <tr>
        <th>Route</th>
        <th>Method</th>
        <th>Role</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>/auth/student/sregister</td><td>POST</td><td>Student</td><td>Register a new student</td></tr>
      <tr><td>/auth/student/slogin</td><td>POST</td><td>Student</td><td>Student login</td></tr>
      <tr><td>/auth/professor/pregister</td><td>POST</td><td>Professor</td><td>Register a new professor</td></tr>
      <tr><td>/auth/professor/plogin</td><td>POST</td><td>Professor</td><td>Professor login</td></tr>
      <tr><td>/availability</td><td>POST</td><td>Professor</td><td>Set available time slots</td></tr>
      <tr><td>/availability/:professorId</td><td>GET</td><td>Student</td><td>View professor availability</td></tr>
      <tr><td>/appointment</td><td>POST</td><td>Student</td><td>Book an appointment</td></tr>
      <tr><td>/appointment/:id</td><td>DELETE</td><td>Professor</td><td>Cancel an appointment</td></tr>
      <tr><td>/appointment/my</td><td>GET</td><td>Student</td><td>Get student's booked appointments</td></tr>
    </tbody>
  </table>

  <h2>👤 Author</h2>
  <p><strong>Kaushalendra Singh</strong><br>
    B.Tech CSE (AI & ML) @ PSIT<br>
    <a href="https://github.com/its-ks" target="_blank">GitHub</a> | 📧 its.ks6342@gmail.com
  </p>
</body>
</html>
