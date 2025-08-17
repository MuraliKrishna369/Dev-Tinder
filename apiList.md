# DevTinder APIs

# Authrouter
- POST /signup
- POST /login
- POST /logout

# Profile Router
- PATCH /profile/edit
- PATCH /profile/password/edit

# Connection Request Router
- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId

# User Router
- GET /user/request/received
- GET /user/connections
- GET /user/feed
