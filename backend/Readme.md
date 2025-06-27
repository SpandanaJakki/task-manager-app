 Backend - Spring Boot

This is the backend for the Task Manager App, built with Spring Boot 3 and Java 17.

Setup & Run:
bash
cd backend
./mvnw spring-boot:run


 API Endpoints

| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| GET    | /api/tasks        | Fetch all tasks        |
| POST   | /api/tasks        | Create a new task      |
| PUT    | /api/tasks/{id}   | Mark task as completed |
| DELETE | /api/tasks/{id}   | Delete a task          |

H2 Database Console

Visit: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

H2 Credentials:
- JDBC URL: jdbc:h2:mem:taskmanager
- User: test
- Password: 

 Technologies:
- Spring Boot 3
- Spring Data JPA
- H2 Database
- Java 17
