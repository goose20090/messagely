import { useState } from 'react';
import './App.css';
import LoginDraft from './components/LoginDraft';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(false)

  function onLogin(user){
    setLoggedInUser(user)
  }
  return (
    <div className="App">
      <header className="App-header">
        {loggedInUser? <h1>Hello {loggedInUser.username}</h1>: <LoginDraft onLogin={onLogin}/>}
      </header>
    </div>
  );
}

export default App;
