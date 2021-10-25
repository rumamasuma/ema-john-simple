import {useState , useEffect} from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged ,signOut} from "firebase/auth";
import initializeAuthentication from '../Firebase/firebase.init';

initializeAuthentication();
const useFirebase =() =>{

    const [user, setUser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

     const signInUsingGoogle =() =>{
        return signInWithPopup (auth, googleProvider)
        //  .then(result =>{
        //      console.log(result.user);
        //  })
     }
    //  logged out
    const logOut = () =>{
        signOut(auth)
        .then(() => {
            setUser({})
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
    }
    // obsereve whether user auth state changed or not (find out signed in user)
    useEffect ( () =>{
      const unsubscribe =  onAuthStateChanged(auth , (user) =>{
            if(user){
           setUser(user);
            }
        })
        return unsubscribe;
    },[])
    return {
        user, signInUsingGoogle , logOut
    }
}
export default useFirebase;