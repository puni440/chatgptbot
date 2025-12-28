# Chat Application (React + Django REST Framework)

A full-stack chat application built using **React (Vite)** for the frontend and **Django REST Framework** for the backend.  
The application supports authenticated users, persistent conversations, and a ChatGPT-like chat flow where a conversation is created only when the first message is sent.

---

## Overview (What Was Built)

This project is a ChatGPT-like chat application where users can register, log in, and interact with a chatbot.  
Chats are organized into conversations, and chat history is preserved across sessions.

Key highlights:
- Authenticated chat experience
- Conversation-based chat history
- Persistent storage of messages
- Clean and responsive UI

---

## Features

1. User Authentication (JWT-based)
2. Chat interface similar to ChatGPT
3. Conversation-based chat history
4. New conversation created only on first message
5. Delete conversations
6. Load previous messages
7. Responsive UI using Tailwind CSS

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Tailwind CSS

### Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)
- SQLite (for persistence)

---

## Architecture

The application follows a **client–server architecture**:

- The **frontend (React)** handles UI rendering and user interaction.
- The **backend (Django REST Framework)** exposes REST APIs for authentication, conversations, and messages.
- **JWT tokens** are used for secure authentication.
- All chat data is stored in a database to ensure persistence.

**Flow:**

Frontend (React)  
→ REST API calls  
→ Django REST Backend  
→ Database (Conversations & Messages)

---

## Design Decisions

- **React + Vite** was chosen for fast development and optimized builds.
- **Django REST Framework** was used for clean API design and scalability.
- **JWT authentication** enables stateless and secure user sessions.
- Conversations are created **only when the first message is sent**, preventing empty or unused database records.
- A **rule-based chatbot logic** was implemented instead of using external AI APIs, strictly following assignment constraints.

---

## Chat Logic Explanation (No External AI APIs)

This chatbot does **not** use OpenAI or any external AI services.

- User messages are processed using a **rule-based / intent-based logic**.
- Keywords or patterns in user input are matched against predefined intents.
- Based on the matched intent, a predefined response is returned.
- The logic is implemented in `core/logic.py`.

This approach ensures predictable responses and full control over chatbot behavior.

---

## Persistence Strategy

- Conversations and messages are stored in the database.
- Each message is linked to:
  - A user
  - A specific conversation
- When a user logs in or refreshes the page:
  - Existing conversations are fetched
  - Messages are loaded from the database
- This ensures chat history **persists across sessions and server restarts**.

---

## Project Structure (Simplified)

CHATGPTBOT/
├── backend/
│ └── chatbot/
│ ├── chatbot/ # Django project settings
│ ├── accounts/ # Authentication & user management
│ ├── core/ # Conversations, messages & bot logic
│ ├── db.sqlite3
│ └── manage.py
│
├── frontend/
│ └── chatbot/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── sidepages/
│ │ ├── auth/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
├── screenshots/
└── README.md

yaml
Copy code

---

## Backend Setup (Django)

1. Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate   # Windows
Install dependencies

bash
Copy code
pip install django djangorestframework djangorestframework-simplejwt corsheaders
Run migrations

bash
Copy code
python manage.py makemigrations
python manage.py migrate
Create superuser (optional)

bash
Copy code
python manage.py createsuperuser
Start backend server

bash
Copy code
python manage.py runserver
Backend runs at:
http://127.0.0.1:8000/

Frontend Setup (React)
Install dependencies

bash
Copy code
npm install
Start development server

bash
Copy code
npm run dev
Frontend runs at:
http://localhost:5173/

Application Flow
New Chat
Clicking New Chat opens an empty chat screen

No conversation is created at this stage

Sending First Message
API: POST /api/chat/

Backend creates a new conversation

Returns conversation_id

Frontend navigates to /chat/:conversation_id

Conversation appears in recent chats

Existing Chat
Clicking a conversation loads messages using:

ruby
Copy code
GET /api/conversations/:id/messages/
API Endpoints
Method	Endpoint	Description
POST	/api/chat/	Send message & create conversation
GET	/api/conversations/	List conversations
GET	/api/conversations/:id/messages/	Get messages
DELETE	/api/conversations/:id/	Delete conversation

Authentication
JWT token is issued on login

Token is stored on the client

Token is sent automatically using a custom fetchWithAuth function

Protected routes are accessible only after authentication

Screenshots







Notes
Conversations are not created empty

A conversation exists only after the first message

Prevents unnecessary database entries

Matches real-world chat apps like ChatGPT and WhatsApp

Future Improvements
Typing indicator

Message loading animation

Active conversation highlighting

Pagination for conversations

WebSocket support for real-time chat

Author
Punith J
📧 punithrajkumar3504@gmail.com
🎓 BCA Student
💻 Full-Stack Developer (React + Django