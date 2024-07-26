# Placement Portal - Job Seeking Web Application
https://chiraggargjobportal.netlify.app/
## Overview
The Placement Portal is a dynamic job-seeking web application developed using the MERN stack (MongoDB, Express, React, Node.js). This application is designed to streamline the job application process for students and employers associated with a college placement cell. It offers separate logins for job seekers and employers, making it easy for students to apply for jobs and for employers to post and manage job listings.

## Features

### Job Seeker Features
- **👤 User Registration and Login:** Secure registration and login functionalities with JWT token-based authentication.
- **📝 Profile Management:** Job seekers can create their profiles, including uploading resumes.
- **🔍 Job Search and Application:** Users can search for job listings, view job details, and apply directly through the portal.

### Employer Features
- **👥 Employer Registration and Login:** Secure registration and login functionalities for employers.
- **📄 Job Posting:** Employers can create and post job listings with detailed descriptions and requirements.
- **📂 Application Management:** View and manage applications received for job postings.
- **🏢 Profile Management:** Employers can update their company profiles and job posting details.

## Technical Details

### Back-End
- **🟢 Node.js and Express:** The back-end is built using Node.js and Express, providing a robust and scalable server.
- **🍃 MongoDB:** Utilized as the database to store user information, job listings, and application data.
- **🔐 JWT Authentication:** JSON Web Tokens are used for secure user authentication and authorization.
- **🛡 Middleware:** Custom middleware for error handling, authentication, and authorization.
- **☁ Cloudinary:** Integrated for managing and storing resume uploads and other media files.

### Front-End
- **⚛ React:** The front-end is built using React, offering a dynamic and responsive user interface.
- **🚦 React Router:** For navigation and routing between different components and pages.

## Key Functionalities
- **🔒 User and Employer Authentication:** Secure registration and login processes with password hashing and token-based authentication.
- **📃 Job Posting and Application:** Comprehensive forms for job posting and application submission with real-time validations.
- **📂 Profile and Resume Management:** Features for users to manage their profiles and upload resumes.
- **🛡 Role-Based Access Control:** Ensures proper access and permissions based on user roles (job seeker, employer).
