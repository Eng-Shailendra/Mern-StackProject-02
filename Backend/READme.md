# Authentication API

## Description

This is a simple authentication API built with Node.js and Express. It provides endpoints for user registration, login, and token validation.

## Installation

1. Clone the repository:
   `git clone <>`

## Regester a user

to regester a user send a post request to
`http://localhost:3001/api/auth/register`
with the the data in body json

````{
    "username" : "NAME",
    "email" : "EMAIL",
    "password" : "PASSWORD"
}
```
