import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      setError(null);
      history.push('/');
    }).catch((error) => {
      setError('Please Try Again')
    }) 
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <p onClick={() => {
          history.push('/signup')
        }} style={{ textAlign: 'center', cursor: 'pointer' }}>Signup</p>
        {error && <p style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', padding: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
