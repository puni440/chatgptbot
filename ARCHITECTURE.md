# Architecture Documentation

This document describes the high-level architecture, component interaction, and data flow of the Chat Application built using React and Django REST Framework.

---

## Overview

The application follows a **client–server architecture** where the frontend and backend are clearly separated. The frontend is responsible for user interaction and UI rendering, while the backend handles business logic, authentication, data persistence, and chatbot response generation.

---

## High-Level Architecture

```
User
  ↓
Browser (React Frontend)
  ↓  HTTP / JSON (REST APIs)
Django REST Backend
  ↓
Database (SQLite)
```

---

## Frontend Architecture (React)

The frontend is built using **React (Vite)** and follows a component-based architecture.

### Key Responsibilities

* Rendering the user interface
* Handling user interactions
* Managing authentication state
* Communicating with backend APIs

### Main Components

* **AuthContext** – Manages authentication state and JWT handling
* **PrivateRoute** – Protects routes that require authentication
* **Chat Component** – Displays messages and handles message sending
* **Sidebar Component** – Displays conversation history
* **Navbar Component** – Provides navigation

### State Management

* React **Context API** is used for global authentication state
* Local component state manages chat messages and UI interactions

---

## Backend Architecture (Django REST Framework)

The backend is built using **Django REST Framework** and follows a modular app-based structure.

### Core Apps

* **accounts** – Handles user registration, login, and JWT authentication
* **core** – Manages conversations, messages, and chatbot logic

### Key Responsibilities

* User authentication and authorization
* API request handling
* Chat logic execution
* Data persistence

---

## Chatbot Logic Architecture

The chatbot logic is implemented using a **rule-based / intent-based approach**.

### Flow

1. User sends a message from the frontend
2. Backend receives the message via `/api/chat/`
3. Message text is passed to the chatbot logic module (`logic.py`)
4. Logic matches user input against predefined intents or keywords
5. A predefined response is generated and returned
6. Both user message and bot response are stored in the database

This approach avoids the use of external AI APIs and ensures predictable behavior.

---

## Data Persistence Layer

The application uses a relational database (**SQLite**) for data storage.

### Stored Entities

* Users
* Conversations
* Messages

### Relationships

* A **User** can have multiple **Conversations**
* A **Conversation** contains multiple **Messages**
* Each **Message** belongs to one **Conversation** and one **User** (sender)

This design ensures that chat history persists across sessions and server restarts.

---

## API Communication

* The frontend communicates with the backend using REST APIs
* All data is exchanged in **JSON** format
* JWT tokens are sent in request headers for protected endpoints

---

## Security Considerations

* JWT-based authentication ensures stateless security
* Protected routes require valid tokens
* Backend validates user permissions before accessing conversations or messages

---

## Scalability Considerations (Future)

* Replace SQLite with PostgreSQL or MySQL
* Introduce caching (Redis) for frequently accessed data
* Add WebSocket support for real-time messaging
* Deploy frontend and backend as separate services

---

## Summary

This architecture provides:

* Clear separation of concerns
* Scalable and maintainable structure
* Secure authentication and data handling
* Persistent and reliable chat functionality

---

## End of Architecture Document
