# SkillBridge Server

A full-featured backend API for a tutoring marketplace platform built with **Express.js**, **Prisma ORM**, and **TypeScript**. SkillBridge connects students with tutors, enabling seamless booking, review, and rating functionality.

## Overview

SkillBridge Server provides a robust REST API for managing:

- User authentication and authorization (Students, Tutors, Admins)
- Tutor profile management with ratings and reviews
- Booking system with scheduling
- Review and rating system
- Category management for different subjects/skills
- Admin dashboard functionality

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Zod schema validation
- **Development**: ts-node-dev with hot reload

## Database Schema

### Core Models

#### User

- Stores user information (students, tutors, admins)
- Roles: STUDENT, TUTOR, ADMIN
- Email-based unique identification
- Password hashing with bcrypt

#### TutorProfile

- Extended profile for tutors
- Contains: bio, experience, hourly rate, subjects, availability
- Tracks average rating and review count

#### Booking

- Manages tutoring sessions
- States: CONFIRMED, COMPLETED, CANCELLED
- Links student, tutor, and category

#### Review

- Student reviews for completed sessions
- One review per booking
- Ratings and comments

#### Category

- Subject/skill categories for tutoring

## Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. Users register/login to receive a JWT token
2. Include token in `Cookies`
3. Server validates token using JWT_SECRET
4. Role-based access control (RBAC) applied to protected routes

### Password Security

- Passwords hashed with bcrypt before storage
- Minimum security standards enforced

## Error Handling

The API implements global error handling with:

- Consistent error response format
- HTTP status codes
- Descriptive error messages
- Detailed logging for debugging

## Environment Variables

| Variable       | Description                  | Required           |
| -------------- | ---------------------------- | ------------------ |
| `PORT`         | Server port                  | No (default: 3000) |
| `DATABASE_URL` | PostgreSQL connection string | Yes                |
| `JWT_SECRET`   | Secret key for JWT signing   | Yes                |

**Made with ❤️ using Express, Prisma, and TypeScript**
