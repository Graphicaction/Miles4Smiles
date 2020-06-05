import React, {useState, useEffect, useContext} from "react";
import UserCard from "../../components/UserCard/UserCard";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import PostSignUpUserData from "../../components/PostSignUpUserData/PostSignUpUserData"
import {Card} from "../../components/Card"
import { Row, Col, Container } from "../../components/Grid";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";
import LatestUpdate from "../../components/LatestUpdate/LatestUpdate"
import ChallengeContext from "../../utils/ChallengeContext"
import ItemsCarousel from 'react-items-carousel';



const Welcome = (props) =>{
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
// //we will need city,state to show only users from same location
//   const [location, setLocation] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [donatedAmountData, setDonatedAmountData] = useState([]);
  const [donorData, setDonorData] = useState([]);
  const [challengersData, setChallengersData] = useState([]);
  const [firstLogin, setFirstLogin] = useState(false);
  const { user } = useContext(UserContext);
 //setup to direct first time login user to different component before going to usual welcome
 
  useEffect(()=>{
    if(user)
      setFirstLogin(user.firstLogin);
  }, [user]);

  useEffect(() => {
    loadChallenges()
  }, [] )
  
  function loadChallenges() {
    let allChallenges=[];
    let distanceData=[];
    let donatedAmountData = [];
    let donorData =[];
    let challengersData =[]
  
    API.getChallenges()
      .then(response => {
        allChallenges = response.data.challenges;
        allChallenges.map(challenge => {
            distanceData.push(challenge.distance);
            donatedAmountData.push(challenge.donatedAmount)
            donorData.push(challenge.donor);
            challengersData.push(challenge.challengers)
            }
          )
        setChallenges(allChallenges);
        setDistanceData(distanceData);
        setDonatedAmountData(donatedAmountData);
        setDonorData(donorData);
        setChallengersData(challengersData);
      })
      .catch(err => console.log(err));

  };
//change user from first time to returning user
  const flip = ()=> {
    setFirstLogin(false);
  }

 

  //update react context
  const updateUser =(newData) => {
    console.log(newData)
    // props.updateUser(newData);
    }
 
    
  return(
    <div>

    { firstLogin && (
      //if it's a first time user and more info needs to be entered to complete the user data
     <div>
      <PostSignUpUserData id={user._id} flip={flip} updateUser={updateUser}/>
     </div>
    )}
    { !firstLogin && (
     
    //if it's a returning user display this
    <div>
    <Jumbotron >
      <h2 className="display-4">Miles 4 Smiles </h2>
      <hr></hr>
      <h3>We are so excited you are back again and want to continue to support your local business!</h3>
      <h3>Select and challenge a user who runs at a similar pace than you do!</h3>
   </Jumbotron>

   <Row >
   <div className="container-fluid">
    {/* <div id="carousel" class="carousel slide" data-ride="carousel" data-interval="9000">
        <div class="carousel-inner row w-100 mx-auto" role="listbox"> */}
    <div className="card-deck d-flex justify-content-center" style={{margin: "20px"}}>
      {/* <div className="col-md-3 carousel-item"> */}
      <UserCard className=" carousel-item"/>
      </div>
    {/* </div>
    </div> */}
        {/* <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <i className="fa fa-chevron-left fa-lg text-muted"></i>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next text-faded" href="#carouselExample" role="button" data-slide="next">
            <i className="fa fa-chevron-right fa-lg text-muted"></i>
            <span className="sr-only">Next</span>
        </a> */}
    {/* </div>*/}
  </div>
   </Row>

   <Row>

    <Col size="12">
    <Card title="Latest Miles 4 Smiles Updates">
      <ChallengeContext.Provider value={{challenges}}>
        {challenges.length>0 ? <LatestUpdate /> : (<p className="text-center">No completed challenge yet. You should start one!</p>)}
      </ChallengeContext.Provider>
    </Card>
    </Col>
    </Row>
   </div>
     )}
 
  </div>
  )
}

export default Welcome;

