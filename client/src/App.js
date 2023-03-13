import { useState, useEffect } from 'react';
import './App.css';
import DraftLoginScreen from './components/DraftLoginScreen';
import LoginDraft from './components/LoginDraft';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(false)

  useEffect(()=> {
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=> setLoggedInUser(user))
      }
    })
  }, []);

  function onLogin(user){
    setLoggedInUser(user)
  }

  function onLogout(user){
    setLoggedInUser(false)
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> console.log("logout successful"));
  }
  return (
    <div className="App">
      <header className="App-header">
        {loggedInUser? 
        <DraftLoginScreen user = {loggedInUser} onLogout = {onLogout}/>
        : <LoginDraft onLogin={onLogin}/>}
      </header>
    </div>
  );
}

export default App;
