import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/postContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Posts() {

  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  //here the products is an arrya because we will get more products while the user uploading products so it can be stored by using array.
  const { setPostDetails } = useContext(PostContext)
  const history = useHistory()

  useEffect(() => [
    firebase.firestore().collection('products').get().then((snapshot) => {
      //so here it gets the data to the page ,the get returns a snapshot
      const allPost = snapshot.docs.map((product) => {
        //whatever we returning from inside the map then it will enter to the allPost array
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost);
    })
  ], []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
            products.map((product) => {


              return <div
                className="card"
                onClick={() => {
                  setPostDetails(product)
                  history.push('/view')
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.date}</span>
                </div>
              </div>

            })

          }

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        {
          products.map((product) => {


            return <div
              className="card"
              onClick={() => {
                setPostDetails(product)
                history.push('/view')
              }}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.date}</span>
              </div>
            </div>

          })

        }


      </div>
    </div>
  );
}

export default Posts;
