import React, { useContext, useState, useEffect } from "react";
import "./View.css";
import { PostContext } from "../../store/postContext";
import { FirebaseContext } from "../../store/FirebaseContext";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchPostDetails = () => {
      if (postDetails) {
        const { userId } = postDetails;

        firebase
          .firestore()
          .collection("users")
          .where("id", "==", userId)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              setUserDetails(doc.data());
            });
          });
      }
    };

    // Check local storage for postDetails on component mount
    const storedPostDetails = JSON.parse(localStorage.getItem("postDetails"));

    if (storedPostDetails&& !postDetails) {
      setPostDetails(storedPostDetails);
      const { userId } = storedPostDetails;

      firebase
        .firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
      
    } else {
      // Fetch postDetails if not in local storage
      fetchPostDetails();
    }
  }, []);

  useEffect(() => {
    // Store postDetails in local storage whenever it changes
    if (postDetails) {
      localStorage.setItem("postDetails", JSON.stringify(postDetails));
    }
  }, []);

  return (
    <div className="viewParentDiv">
      {postDetails ? (
        <>
          <div className="imageShowDiv">
            <img src={postDetails.url} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.name}</span>
              <p> {postDetails.category} </p>
              
              
              <span> { postDetails.createdAt } </span>
            </div>
            {userDetails && (
              <div className="contactDetails">
                <p>Seller details</p>
                <p> {userDetails.username} </p>
                <p>{userDetails.phone}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;