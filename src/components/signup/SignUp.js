import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import {database,firebaseApp,collection, auth,createUserWithEmailAndPassword,set,ref} from "../../firebase.js";

export const SignUp = () => {
    // const userCollection=collection(database,'users/');
  const [currentUser, setCurrentUser] = useState(null);    
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    const cred = createUserWithEmailAndPassword(auth,
        email.value, 
        password.value);      
    setCurrentUser(true);
    
    if(cred) {
        console.log({ cred });
        const userId = cred.user.uid;
        const userData = {
            id:userId,
            name: 'firstName',
            email: 'email'
        };
        set(ref(database,'people/'+userId),userData);
        // cred.collection('people/').doc(userId).set(userData)
    }

}

  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};