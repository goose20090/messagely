import { useState, useEffect, useContext } from 'react';
import './App.css';
import DraftLoginScreen from './components/DraftLoginScreen';
import LoginDraft from './components/LoginDraft';
import BeatLoader from 'react-spinners/BeatLoader'
import { UserContext } from './context/user';

function App() {

  const {user, setUser} = useContext(UserContext)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=> {
          setUser(user);
          setLoading(false);
        })
      }
      else {setLoading(false)}
    })
  }, []);

  function onLogin(user){
    setUser(user)
    console.log("login successful")
    setLoading(false)
  }

  function onLogout(){
    setUser(false)
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
        <BeatLoader color= {"rgb(54, 215,183"}/>
        :
        user? 
        <DraftLoginScreen user = {user} onLogout = {onLogout} setLoading = {setLoading}/>
        : 
        <LoginDraft onLogin={onLogin} setLoading = {setLoading}/>}
      </header>
    </div>
  );
}

export default App;
