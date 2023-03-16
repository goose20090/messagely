import { useState, useEffect, useContext } from 'react';
import './App.css';
import Login from "./components/Auth/Login"
import { UserContext } from './context/user';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Signup from "./components/Auth/Signup";
import MessagesPage from "./components/MessagesPage/MessagesPage";
import Loader from './components/Auth/Loader';

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

  function onLogout() {
    setLoading(true);
    setUser(false);
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      console.log("logout successful");
      setLoading(false);
    });
  }


  
  
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path = "/signup">
            {loading ? <Loader/>
            : 
            <Signup onLogin = {onLogin} setLoading = {setLoading} setSignupErrors = {setSignupErrors} signUpErrors = {signupErrors} setLoginErrors = {setLoginErrors}/>}
          </Route>
          <Route path = "/messages" >
          {loading ? <Loader/>
            : <MessagesPage onLogout= {onLogout}/>}
          </Route>
          <Route path = "/">
            {loading ? <Loader/>
            :
            <Login user = {user} onLogin={onLogin} setLoading = {setLoading} loginErrors = {loginErrors} setLoginErrors = {setLoginErrors} setSignupErrors = {setSignupErrors}/>}
          </Route>
        </Switch>
      </header>
    </div>
  );

}

export default App;

