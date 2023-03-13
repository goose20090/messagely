import { useState, useEffect } from 'react';
import './App.css';
import DraftLoginScreen from './components/DraftLoginScreen';
import LoginDraft from './components/LoginDraft';
import ClimbingBoxLoader from 'react-spinners/ClipLoader'

function App() {

  const [loggedInUser, setLoggedInUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=> {
          setLoggedInUser(user);
          setLoading(false);
        })
      }
      else {setLoading(false)}
    })
  }, []);

  function onLogin(user){
    setLoggedInUser(user)
    setLoading(false)
  }

  function onLogout(){
    setLoggedInUser(false)
    fetch("/logout", {
      method: "DELETE",
    }).then(()=> {
      console.log("logout successful");
      setLoading(false);
    });

  }
  return (
    <div className="App">
      <header className="App-header">
        {loading?
        <ClimbingBoxLoader color= {"rgb(54, 215,183"}/>
        :
        loggedInUser? 
        <DraftLoginScreen user = {loggedInUser} onLogout = {onLogout} setLoading = {setLoading}/>
        : 
        <LoginDraft onLogin={onLogin} setLoading = {setLoading}/>}
      </header>
    </div>
  );
}

export default App;
