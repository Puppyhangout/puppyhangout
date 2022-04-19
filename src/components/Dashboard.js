import {React,  useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import {database,firebaseApp, auth,createUserWithEmailAndPassword,set,ref} from "../firebase.js";

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  if (!currentUser) {
    <Redirect to="/login" />;
  }else{
            //hopefully it write on firebase cloud
            set(ref(database, 'users/' + 'aaaa'), {
              name: 'succesfully updated',
              email: 'aaa',
              password: 'aa'
              //   profile_picture : imageUrl
          })
  }
  return (
    <div>

      <h1>Welcome {currentUser}</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      {/* <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button> */}
    </div>
  );
};

export default Dashboard;