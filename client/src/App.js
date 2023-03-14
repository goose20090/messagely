import { useState, useEffect, useContext } from 'react';
import './App.css';
import BeatLoader from 'react-spinners/BeatLoader'
import Login from './components/Login';
import { UserContext } from './context/user';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Signup from './components/Signup';
import MessagesPage from './components/Messages';

function App() {

  const [loginErrors, setLoginErrors] = useState("")
  const [signupErrors, setSignupErrors] = useState({})
  const {user, setUser} = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const history = useHistory();

  useEffect(()=> {
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=> {
          setUser(user);
          setLoading(false);
          history.push("/messages")
        })
      }
      else setLoading(false)
    })
  }, []);

  function onLogin(user){
    setUser(user)
    setLoginErrors({})
    console.log("login successful")
    setLoading(false)
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path = "/signup">
            {loading ? <div className="flex flex-col items-center justify-center h-screen"><BeatLoader color= {"rgb(54, 215,183"}/> </div>: <Signup onLogin = {onLogin} setLoading = {setLoading} setSignupErrors = {setSignupErrors} signUpErrors = {signupErrors}/>}
          </Route>
          <Route path = "/messages" >
            <MessagesPage user = {user} setUser= {setUser} setLoading = {setLoading}/>
          </Route>
          <Route path = "/">
            {loading ? <div className="flex flex-col items-center justify-center h-screen"><BeatLoader color= {"rgb(54, 215,183"}/> </div>: <Login onLogin={onLogin} setLoading = {setLoading} loginErrors = {loginErrors} setLoginErrors = {setLoginErrors}/>}
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;

