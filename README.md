# Messaging-like

Messaging-like is a React and Rails-based application, streamlined for user messaging. The application serves as a platform for users to manage conversations, send, edit, and delete messages.

For each message sent, on-spot error notifications are provided during validation failures. Conversations are dynamic, permitting edit and delete actions on a user's own messages. However, users cannot delete others' messages, and the system responsibly notifies the recipient of any changes.

## Features

   - Account creation and authentication.
   - Send, edit, or delete messages.
   - Initiate and manage conversations with other users.
   - Message validity assurance with immediate error notifications.
   - Conversation filter based on usernames.
   - Persistent login with 'Remember Me' option.
   - Unread notifications for conversations

## Setup

### Prerequisites

Ruby 2.7+
Rails 6.0+
Node.js 14+
Postgres 12+
Installation

### Installation

1. Clone the repository and navigate to it:

```sh
git clone https://github.com/goose20090/messaging-like && cd messagely
```

2. Install Rails and JavaScript dependencies:

```sh
bundle install && npm install --prefix client
```
3. Setup the database:

```sh
rails db:create db:migrate
```

4. Start the Rails server and the frontend server: `rails s`
   In a new terminal window: `npm run dev --prefix client`

5. Navigate to `http://localhost:3000` in a web browser.
   
## Acknowledgements

[Messages UI Layout](https://tailwindcomponents.com/component/messages-ui-layout)) by iaminos.
