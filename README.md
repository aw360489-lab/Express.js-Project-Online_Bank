# Online Banking

## Overview

The Banking Management System is a secure web application developed using Node.js, Express.js, MongoDB, Mongoose, Passport.js, and Bootstrap. The system implements authentication, authorization, account management, transaction processing, administrative control, and input validation following the MVC (Model-View-Controller) architecture.

The application allows users to register, log in securely, manage their bank accounts, perform transactions, and view transaction history. Administrators have additional privileges to manage users and accounts across the entire system.

---

## Features

### 1. User Authentication

The system provides secure user registration and login functionality using Passport.js and session-based authentication.

#### User Model

The User model stores the following information:

* User ID
* Password (encrypted)
* Administrator status (`isAdmin`)
* Account status (`isActive`, default: true)
* Address
* Phone number

#### Registration

Users can create accounts through the registration page. During registration:

* User IDs must be unique.
* Passwords are encrypted using bcrypt before being stored.
* Input validation is performed using Joi.
* Duplicate registrations are prevented.

#### Login

The login system verifies:

* User existence
* Password correctness
* User account activation status

After successful authentication:

* Normal users are redirected to the dashboard.
* Administrators are redirected to the admin panel.

Failed login attempts display error messages using Bootstrap alerts and preserve previously entered information.

#### User Profile

Authenticated users can:

* View their personal profile
* Update their address and phone number
* Log out securely

#### Session Management

The application uses Express Session to:

* Maintain user login sessions
* Store authenticated user information
* Protect restricted routes

---

### 2. Bank Account Management and Authorization

The system allows users to create and manage their own bank accounts securely.

#### Account Model

Each account contains:

* Account type
* Balance
* Status (active/inactive)
* Account owner reference (`createdBy`)

Supported account types include:

* Savings
* Checking
* Business

#### Account Operations

Users can:

* View all their accounts
* Create new accounts
* View account details
* Activate or deactivate their accounts

The system prevents duplicate account creation when necessary.

#### Authorization

Server-side authorization ensures that:

* Users can only access their own accounts.
* Account operations are restricted to account owners.
* Administrators can access all accounts.

Authorization checks are implemented using middleware.

---

### 3. Transaction Management

The system supports several transaction types.

#### Deposit

Users can deposit funds into their accounts.

#### Withdrawal

Users can withdraw funds if sufficient balance exists.

#### Transfer

Users can transfer money between accounts.

The system validates:

* Account existence
* Positive transaction amounts
* Sufficient account balance

#### Transaction History

Users can view transaction records, including:

* Transaction type
* Amount
* Description
* Date and time

#### Transaction Search

The application supports searching transaction history by:

* Transaction description
* Transaction type
* Account
* Date
* Amount

Search functionality uses MongoDB query filtering and case-insensitive matching.

---

### 4. Input Validation

All user input is validated using Joi schemas to ensure data integrity and prevent invalid operations.

#### User Validation

Registration requires:

* Unique user ID
* Username with a maximum of 100 characters
* Password with a minimum of 8 characters

Login requires:

* User ID
* Password

#### Account Validation

Account creation validates:

* Account type selection
* Required fields

#### Transaction Validation

Transaction validation ensures:

* Valid transaction type
* Positive numeric amount
* Required transaction information

Validation is implemented through reusable middleware.

---

### 5. Administrator Functions

Administrators have access to a dedicated administration panel.

#### User Management

Administrators can:

* View all users
* Activate user accounts
* Deactivate user accounts

Inactive users are prevented from logging in.

#### Account Management

Administrators can:

* View all bank accounts
* Activate accounts
* Deactivate accounts

#### Transaction Monitoring

Administrators can access transaction records across the entire system.

#### Access Control

Administrative routes are protected using middleware that verifies administrator privileges before granting access.

---

## User Interface

The application uses Bootstrap to provide a responsive user interface.

### Technologies Used

* Bootstrap components
* Responsive layouts
* Navigation bars
* Forms
* Tables
* Cards
* Buttons
* Alert messages

### View Engine

The application uses Pug as the templating engine with template inheritance.

### Main Pages

#### Authentication Pages

* Registration page
* Login page
* User profile page

#### Account Pages

* Dashboard
* Account creation page
* Account details page
* Transaction history page

#### Administrative Pages

* Administrator control panel

Conditional rendering is implemented to display navigation items and actions according to user roles and permissions.

---

## Application Architecture

The project follows the MVC (Model-View-Controller) design pattern.

### Models

Responsible for database structure and data management:

* User model
* Account model
* Transaction model

### Controllers

Responsible for business logic:

* Authentication controller
* Account controller
* Transaction controller
* Administrator controller

### Routes

Responsible for handling requests:

* Authentication routes
* Account routes
* Transaction routes
* Administrator routes

### Middleware

Responsible for:

* Authentication
* Authorization
* Input validation
* Session management

### Views

Responsible for rendering the user interface using Pug templates.

---

## Security Features

The system includes several security mechanisms:

* Password encryption using bcrypt
* Session-based authentication
* Passport.js authentication strategy
* Authorization middleware
* Account ownership verification
* Administrator access control
* Input validation using Joi
* Flash messages for secure user feedback
* Prevention of unauthorized account access

---

## Technologies

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Passport.js
* Express Session
* bcrypt
* Joi

### Frontend

* Bootstrap
* Pug

### Development Architecture

* MVC Architecture
* Middleware-based authorization
* Session-based authentication
