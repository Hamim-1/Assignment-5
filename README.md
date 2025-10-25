# Assignment-5
📦 Parcel Delivery API
🎯 Overview

This is a secure, role-based backend API for managing parcel delivery operations — inspired by services like Pathao Courier or Sundarban.
It allows Senders, Receivers, and Admins to create, track, update, and manage parcel deliveries.

🚀 Tech Stack

Node.js + Express.js

TypeScript

MongoDB + Mongoose

Zod (request validation)

JWT Authentication

bcrypt (password hashing)

⚙️ Setup & Installation
# 1️⃣ Clone the repo
git clone https://github.com/Hamim-1/Assignment-5.git

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env

.env file example

# Server
PORT=5000

DB_URL=your_mongodb_uri

NODE_ENV=development

# Bcrypt
BCRYPT_SALT_ROUNDS=10

# JWT
JWT_ACCESS_SECRET=your_jwt_secret_here

JWT_ACCESS_EXPIRES=1d

# 4️⃣ Run the server
npm run dev


Server will run on:
👉 http://localhost:5000/api/v1

#👥 User Roles

## Role	Description

Admin	Manage users, view all parcels, update statuses, block/unblock users
Sender	Create parcels, cancel if not dispatched, view own parcels
Receiver	View incoming parcels, confirm delivery, view delivery history

##🔐 Authentication

Register: POST /api/v1/users/register

Login: POST /api/v1/auth/login

JWT stored in cookies or Authorization header

##📦 Parcel Endpoints

###Endpoint	Method	Access	Description

/api/v1/parcels	POST	Sender	Create new parcel      

/api/v1/parcels/me	GET	Sender	View own parcels

/api/v1/parcels/incoming	GET	Receiver	View incoming parcels

/api/v1/parcels/:id/cancel	PATCH	Sender/Admin	Cancel a parcel (if not dispatched)

/api/v1/parcels/:id/confirm	PATCH	Receiver/Admin	Confirm delivery

/api/v1/parcels/:id/status	PATCH	Admin	Update parcel status

/api/v1/parcels/:trackingId	GET	Public	Track parcel by tracking ID

/api/v1/parcels/history	GET	Receiver	View delivered history

/api/v1/parcels	GET	Admin	View all parcels

##👮 User Management (Admin Only)

###Endpoint	Method	Description

/api/v1/users/:id/status	PATCH	Block/Unblock users

##📜 Parcel Status Flow

REQUESTED → PICKED → IN_TRANSIT → DELIVERED
              ↘
             CANCELED (if not dispatched)


Each parcel contains a trackingEvents[] array storing status history:

{
  "status": "IN_TRANSIT",
  "timestamp": "2025-10-23T10:00:00Z",
  "updatedBy": "adminId",
  "note": "Parcel reached distribution hub"
}
33
✅ Validation Rules

Passwords hashed with bcrypt

Input validated using Zod

Role-based access via JWT middleware

Senders can cancel only their parcels (if not dispatched)

Receivers can confirm only their incoming parcels


