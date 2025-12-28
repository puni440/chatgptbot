
Chat Application (React + Django REST Framework)

A full-stack chat application built using React (Vite) for the frontend and Django REST Framework for the backend.
The app supports authenticated users, persistent conversations, and real-time chat flow where a conversation is created only when the first message is sent.

--------Features
 1.User Authentication (JWT-based)
 2.Chat interface similar to ChatGPT
 3.Conversation-based chat history
 4.New Chat creation on first message
 5.Delete conversations
 6.Load previous messages
 7.Responsive UI with Tailwind CSS

--------- Tech Stack

1.Frontend
    React (Vite)
    React Router
    Context API
    Tailwind CSS

2.Backend
    Django
    Django REST Framework (DRF)
    JWT Authentication

📁 Project Structure (Simplified)
CHATGPTBOT/
│
├── backend/
│   └── chatbot/
│       ├── chatbot/               # Django project settings
│       │   ├── __init__.py
│       │   ├── asgi.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       │
│       ├── accounts/              # Authentication & user management
│       │   ├── __init__.py
│       │   ├── admin.py
│       │   ├── apps.py
│       │   ├── models.py
│       │   ├── serializers.py
│       │   ├── views.py
│       │   └── urls.py
│       │
│       ├── core/                  # Chatbot conversations & messages
│       │   ├── __init__.py
│       │   ├── admin.py
│       │   ├── apps.py
│       │   ├── models.py
│       │   ├── serializers.py
│       │   ├── views.py
│       │   ├── urls.py
│       │   └── logic.py            # Bot response logic
│       │
│       ├── db.sqlite3
│       └── manage.py
│
├── frontend/
│   └── chatbot/
│       ├── src/
│       │   ├── components/         # Reusable UI components
│       │   │   ├── Chat.jsx
│       │   │   ├── NavBar.jsx
│       │   │   └── SideBar.jsx
│       │   │
│       │   ├── pages/              # Route-based pages
│       │   │   ├── Home.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   └── Profile.jsx
│       │   │
│       │   ├── sidepages/           # Static informational pages
│       │   │   ├── About.jsx
│       │   │   └── Update.jsx
│       │   │
│       │   ├── auth/               # Authentication & route protection
│       │   │   ├── AuthContext.jsx
│       │   │   └── PrivateRoute.jsx
│       │   │
│       │   ├── App.jsx
│       │   └── main.jsx
│       │
│       ├── public/
│       ├── package.json
│       ├── vite.config.js
│       └── README.md
│
└── README.md
****

------- Backend Setup (Django)

1️. Create Virtual Environment
python -m venv venv
venv\Scripts\activate   # Windows

2️. Install Dependencies
pip install django djangorestframework djangorestframework-simplejwt corsheaders

3️. Run Migrations
python manage.py makemigrations
python manage.py migrate

4️. Create Superuser (Optional)
python manage.py createsuperuser

5️. Start Backend Server
python manage.py runserver

Backend will run at:

http://127.0.0.1:8000/



-------Frontend Setup (React)
1️.Install Dependencies
npm install 

2️.Start Development Server
npm run dev


Frontend will run at:

http://localhost:5173/

 Application Flow (Important)
 New Chat

Clicking New Chat only opens an empty chat screen

No conversation is created at this stage

------Sending First Message

API: POST /api/chat/

Backend creates a new conversation

Returns conversation_id

Frontend navigates to /chat/:conversation_id

Conversation appears in Recent Chats

------ Existing Chat

Clicking a conversation loads messages using:

GET /api/conversations/:id/messages/

----API Endpoints
Method	     Endpoint	                       Description

POST     	/api/chat/	                        Send message & create conversation
GET     	/api/conversations/	                List conversations
GET	        /api/conversations/:id/messages/	Get messages
DELETE	    /api/conversations/:id/	            Delete conversation

------ Authentication

JWT token is stored on login

Token is sent automatically using a custom fetchWithAuth function

Protected routes are accessible only after login

▶------ How to Use

Register / Login

Click New Chat

Type a message and press Send

Conversation is created automatically

Chat history appears in sidebar

Click any chat to continue conversation

Delete chats if needed

-----Notes

Conversations are not created empty

A conversation exists only after first message

This avoids unnecessary database entries

Matches real-world apps like ChatGPT & WhatsApp

------Future Improvements (Optional)

Typing indicator

Message loading animation

Active conversation highlight

Pagination for conversations

WebSocket support for real-time chat

------Setup & Usage
Please refer to the setup instructions above to run the frontend and backend locally.


------ Author

PUNITH J
punithrajkumar3504@gmail.com
BCA Student
Full-Stack Developer (React + Django)