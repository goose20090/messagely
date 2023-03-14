import { useState, useEffect, useContext } from 'react';
import './App.css';
import DraftLoginScreen from './components/DraftLoginScreen';
import LoginDraft from './components/LoginDraft';
import BeatLoader from 'react-spinners/BeatLoader'
import Login from './components/Login';
import { UserContext } from './context/user';
import { Link, Route, Switch } from 'react-router-dom';
import DraftSignup from './components/DraftSignup';
import MessagesPage from './components/Messages';

function App() {

  const [loginErrors, setLoginErrors] = useState("")
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

// function handleSubmit(e){
//     e.preventDefault()
//     setLoading(true)

//     fetch("/login",{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData)
//     })
//     .then((r)=> {
//         console.log(r)
//         if (r.ok){
//             r.json().then((user)=> onLogin(user))
//         }
//         else {
//             r.json().then((errorData)=> {
//                 console.log(errorData);
//                 setLoading(false)
//                 setErrors(errorData.error)
//             })
//         }
//     })
// }


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
    setLoginErrors({})
    console.log("login successful")
    setLoading(false)
  }


  
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path = "/signup">
            <DraftSignup onLogin = {onLogin} setLoading = {setLoading}/>
          </Route>
          <Route path = "/messages" >
            <MessagesPage user = {user} setUser= {setUser} setLoading = {setLoading}/>
          </Route>
          <Route path = "/">
            <div className="flex flex-col items-center justify-center h-screen">
              {loading ? <BeatLoader color= {"rgb(54, 215,183"}/>: <Login onLogin={onLogin} setLoading = {setLoading} loginErrors = {loginErrors} setLoginErrors = {setLoginErrors}/>}
            </div>
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