import React, { useEffect, useContext,useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignUp from './Pages/Signup';
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import Post from './store/postContext';

function App() {

  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
   const [user, setUsers]=useState('')
   useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUsers(authUser);
      } else {
        // User is not logged in
        setUsers(null);
      }
    });   return () => {
      
      unsubscribe();
    };
  }, []);


  return (
    <div>
      <Post>
        <Router>
          {/* signUp router */}
          <Route exact path='/'>
            <Home />
          </Route>
          {/* signUp router */}
          <Route path='/SignUp'>
            <SignUp />
          </Route>
          {/* signUp router */}
          <Route path='/login'>
            <Login />
          </Route>
          {/* Create router */}
          <Route path='/create'>
            {(user?<Create />:<Login />)}
          </Route>
          {/* View router */}
          <Route path='/view'>
            <ViewPost />
          </Route>

        </Router>
      </Post>
    </div>
  );
}

export default App;
