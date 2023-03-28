# Messagely

This is a React-based Single Page Application, with a Ruby-on-Rails backend. It allows users to create their own accounts, log in, receive messages from other users as well as being able to send, edit and delete their own. 

It was designed partly to fulfil a set of passing criteria for the phase 4 project of Flatiron's Software Engineering Course.


## Project Requirements for the Messagely Messaging App


1) *Use a Rails API with a React frontend*

   - This app's backend was generated with the rails --api flag
    
   - That backend responds to requests of the React frontend, submitted by the user via links and forms


2)  *Have at least three models that include a many-to-many relationship and full CRUD actions for at least one resource.*

    -  This app has 3 resources: Users, Messages and Conversations
    
    - Users and Conversations have a many-to-many relationship and are linked by the conversation_user join table

    - Full CRUD actions are available on both messages and conversations

3) *Active Record Validations must be present on your models for most attributes*

   - There are validations for all user-submitted attributes for the Conversation, User and Message models


4) *Use controller validations to alter backend json responses to front end; pass error messages to the frontend and dispaly them if the action fails*

   - As displayed in the User Experience, failed validations display their errors to the DOM

5) Properly update front end state upon successful response from a POST, PATCH, or DELETE request

    - This app updates its front end via state, rather than successive GET requests 

6) *Have at least 3 different client-side routes using React Router*

   - This app has 3 client-side routes: /login, /signup and /messages

7) *Implement authentication/authorisation, including password protection. Users must be able to sign up, log in (and stay logged in via user ID in the session hash) and log out*

   - This app implements both authentication and authorisation

   - Passwords are hashed and salted via BCrypt, via the has_secure_password macro

   - Users can stay logged in via the session hash

   - They also have the option of deselecting 'remember me' and *not* staying logged in via the sesion hash


8) *Use the React hook useContext to persist your logged in user object in front end state and avoid props drilling*

   - This app uses context to store the fetched user Object

   - It also uses composition in the Messages Page to avoid prop-drilling




## NOTES

   - This backend generates placeholder data for the App via use of the [Faker Gem](https://github.com/faker-ruby/faker)
