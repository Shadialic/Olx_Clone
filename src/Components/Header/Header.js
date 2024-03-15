import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FirebaseContext';
function Header() {

  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext)
  const history = useHistory()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" style={{cursor:'pointer'}} onClick={() => history.push('/')}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : <p onClick={() => {
            history.push('/login')
          }} style={{ cursor: 'pointer' }}>login</p>}
          </span>

          <hr />
       
          {user && <span onClick={() => {
            firebase.auth().signOut();
            history.push('/login');
          }}>logout</span>}
        

        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {
              user ? (<span  onClick={() => history.push('/create')}>SELL</span>)
                : (<span  onClick={() => history.push('/login')}>SELL</span>)
            }

          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
