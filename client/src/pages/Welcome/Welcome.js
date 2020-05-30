import React, {useState, useEffect, useContext} from "react";
//import { Route} from 'react-router-dom';
import UserCard from "../../components/UserCard/UserCard";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import PostSignUpUserData from "../../components/PostSignUpUserData/PostSignUpUserData"
import {Card} from "../../components/Card"
import { Row, Col, Container } from "../../components/Grid";
import UserContext from "../../utils/UserContext";
import AUTH from "../../utils/AUTH";
// import ItemsCarousel from 'react-items-carousel';



const Welcome = (props) =>{
  // const [activeItemIndex, setActiveItemIndex] = useState(0);
  // const chevronWidth = 40;
// //we will need city,state to show only users from same location
//   const [location, setLocation] = useState("");
 
  const [firstLogin, setFirstLogin] = useState(false);
  const { user } = useContext(UserContext);
 //setup to direct first time login user to different component before going to usual welcome
  console.log(user);
  useEffect(()=>{
    if(user)
      setFirstLogin(user.firstLogin);
  }, [user]);


//change user from first time to returning user
  const flip = ()=> {
    setFirstLogin(false);
  }

 

  //update react context
  const updateUser =(newData) => {
    console.log(newData)
    // props.updateUser(newData);
    }
  
//build user carousel
  // function nextUser(userIndex) {
  //   // Ensure that the user index stays within our range of users
  //   if (userIndex >= users.length) {
  //     userIndex = 0;
  //   }
  //   setUser(users[userIndex]);
  //   setUserIndex(userIndex);
  // }

  // function previousUser(userIndex) {
  //   // Ensure that the user index stays within our range of users
  //   if (userIndex < 0) {
  //     userIndex = users.length - 1;
  //   }
  //   setUser(users[userIndex]);
  //   setUserIndex(userIndex);
  // }

  // function handleUserBtnClick(event) {
  //   // Get the title of the clicked button
  //   const btnName = event.target.getAttribute("data-value");
  //   if (btnName === "next") {
  //     const newUserIndex = userIndex + 1;
  //     nextUser(newUserIndex);
  //   } else {
  //     const newUserIndex = userIndex - 1;
  //     previousUser(newUserIndex);
  //   }
  // }
 
    
  return(
    <div>

    { firstLogin && (
     <div>
      <PostSignUpUserData id={user._id} flip={flip} updateUser={updateUser}/>

       {/* <PostSignUpUserData id={user._id} flip={flip} updateUserContext={updateUserContext}/> */}
     </div>
    )}
    { !firstLogin && (
     
    //if it's a returning user display this
    <div>
    <Jumbotron >
    {/* <div className="container"> */}
      <h2 className="display-4">Miles 4 Smiles </h2>
      <hr></hr>
      <h3>We are so excited you are back again and want to continue to support your local business!</h3>
      <h3>Select a user close to your location and start a challenge!</h3>
    {/* </div> */}
   </Jumbotron>

   <Row >
    <div className="card-deck" style={{margin: "20px"}}>
      <UserCard />
    </div>
   </Row>

   <Row>

    <Col size="md-12 sm-12">
      <Card title="Latest Updates">
        {/* dynamically render the last challenges that occurred */}
        <ul>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
          <li>Bob won against Sue and sue donated 34$ to Faulisi</li><hr></hr>
        </ul>
      </Card>
    </Col>
    </Row>
   </div>
     )}
 
  </div>
  )
}

export default Welcome;

