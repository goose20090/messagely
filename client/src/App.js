import { useState, useEffect, useContext } from 'react';
import './App.css';
import DraftLoginScreen from './components/DraftLoginScreen';
import LoginDraft from './components/LoginDraft';
import BeatLoader from 'react-spinners/BeatLoader'
import Login from './components/Login';
import { UserContext } from './context/user';
import { Link, Route, Switch } from 'react-router-dom';
import DraftSignup from './components/DraftSignup';

function App() {

  const [errors, setErrors] = useState("")
  const {user, setUser} = useContext(UserContext)
  const [loading, setLoading] = useState(true)


  const [formData, setFormData] = useState({
    username: "",
    password: ""
})

function handleChange(e){
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault()
    setLoading(true)

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    .then((r)=> {
        console.log(r)
        if (r.ok){
            r.json().then((user)=> onLogin(user))
        }
        else {
            r.json().then((errorData)=> {
                console.log(errorData);
                setLoading(false)
                setErrors(errorData.error)
            })
        }
    })
}


  useEffect(()=> {
    fetch("/me").then((r)=>{
      if (r.ok){
        r.json().then((user)=> {
          setUser(user);
          setLoading(false);
        })
      }
      else setLoading(false)
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
        <Switch>
          <Route path = "/signup">
            <DraftSignup onLogin = {onLogin} setLoading = {setLoading}/>
          </Route>
          <Route path = "/messages">
            <h1>{user? user.username: null}</h1>
          </Route>
          <Route path = "/">
            {loading ? <BeatLoader color= {"rgb(54, 215,183"}/>: <Login onLogin={onLogin} setLoading = {setLoading}/>}
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;



// {loading?
//   <BeatLoader color= {"rgb(54, 215,183"}/>
//   :
//   user? 
//   <DraftLoginScreen user = {user} onLogout = {onLogout} setLoading = {setLoading}/>
//   : 
//   <>
//     <LoginDraft onLogin={onLogin} setLoading = {setLoading} setErrors= {setErrors}/>
//     {<p>{errors}</p>}
//     <Link to = "/signup">Sign Up</Link>
//   </>
//   }