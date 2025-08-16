# DevTinder APIs

# Authrouter
- POST /signup
- POST /login
- POST /logout

# Profile Router
- PATCH /profile/edit
- PATCH /profile/password/edit

# Request Connection Router
- POST /request/send/intersted/:userId
- POST /request/send/ignore/:userId

# User Router
- GET /feed/all-users
- GET /review/connection/accepted/:requestId
- GET /review/connection/rejected/:requestId
- GET /review/connection/pending/:requestId
- GET /profile/view