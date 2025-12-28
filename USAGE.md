# Application Usage & API Documentation

This document explains how to set up and run the application locally, along with details about application flow, API endpoints, and authentication.

---

## Backend Setup (Django)

### 1. Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

### 2. Install Dependencies

```bash
pip install django djangorestframework djangorestframework-simplejwt corsheaders
```

### 3. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 5. Start Backend Server

```bash
python manage.py runserver
```

**Backend URL**

```
http://127.0.0.1:8000/
```

---

## Frontend Setup (React)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

**Frontend URL**

```
http://localhost:5173/
```

---

## Application Flow

### New Chat

* Clicking **New Chat** opens an empty chat screen
* No conversation is created at this stage

---

### Sending the First Message

* **API Endpoint**

```
POST /api/chat/
```

* Backend creates a new conversation
* Returns `conversation_id`
* Frontend navigates to:

```
/chat/:conversation_id
```

* Conversation appears in recent chats

---

### Existing Chat

* Clicking an existing conversation loads previous messages
* Messages are fetched using:

```
GET /api/conversations/:id/messages/
```

---

## API Endpoints

| Method | Endpoint                         | Description                        |
| ------ | -------------------------------- | ---------------------------------- |
| POST   | /api/chat/                       | Send message & create conversation |
| GET    | /api/conversations/              | List all conversations             |
| GET    | /api/conversations/:id/messages/ | Fetch messages for a conversation  |
| DELETE | /api/conversations/:id/          | Delete a conversation              |

---

## Authentication

* JWT token is issued on successful login
* Token is stored on the client
* Token is automatically attached to API requests using `fetchWithAuth`
* Protected routes are accessible only to authenticated users

---

## Notes

* Conversations are **not created empty**
* A conversation exists **only after the first message**
* This avoids unnecessary database entries
* The flow matches real-world chat applications like **ChatGPT** and **WhatsApp**

---

## Troubleshooting

* Ensure the backend server is running before starting the frontend
* Verify that the JWT token is present for protected API calls
* Run database migrations if any database-related errors occur
* Check browser console and backend logs for debugging

---

## End of Document
