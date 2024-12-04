# Course Management API

This project is a RESTful API for managing courses with role-based access control. It allows users with different roles (instructors and students) to interact with the system. Instructors can create, update, and delete courses, while students can view courses.

## Features

- **User Authentication**: Register and login using JWT-based authentication.
- **Role-Based Access Control**:
  - Instructors can create, update, and delete courses.
  - Students can view all available courses.
- **CRUD Operations** for Courses:
  - Create, Read, Update, and Delete courses.
- **JWT Protection**: Secured routes using JSON Web Tokens.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/course-management-api.git
   cd course-management-api
