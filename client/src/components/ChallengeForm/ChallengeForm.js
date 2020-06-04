import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { useAlert } from 'react-alert';
import {Row, Col} from "../Grid";
import LocationSearchInput from "../../utils/GPlaces";
import validateChallenge from "./validateChallenge";

function ChallengeForm(props) {
    const { user, users } = useContext(UserContext);
    const [formObject, setFormObject] = useState([]);
    const challengeForm = useRef(null);
    const alert = useAlert();
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };
    //Saving new challenge
    function handleChallengeSave(event) {
        event.preventDefault();
        let challengers;
        //assigning values in challengers array depending upon welcome / mypage call and validating inputs
        let valid;
        if(props.name){
            challengers = [user.username, props.name];
            valid = validateChallenge(props.name,formObject.cMiles,formObject.cDonation,formObject.cBusiness);
        }
        else{
            challengers = [user.username, formObject.oppUser];
            valid = validateChallenge(formObject.oppUser,formObject.cMiles,formObject.cDonation,formObject.cBusiness);
        }
        const donation = formObject.cMiles * formObject.cDonation;
        if(valid){
            API.saveChallenge({
                challengers: challengers,
                businessName: formObject.cBusiness,
                distance: formObject.cMiles,
                donatedAmount: donation,
                donor: "",
                status:"Waiting for Response"
            })
            .then(res => {
                alert.success('Challenge Saved!');
                challengeForm.current.reset();
                if(props.handleChallenge)
                    props.handleChallenge();
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            alert.success("Please enter valid inputs!");
        }
    }

    function handleCancel() {
        challengeForm.current.reset();
    }
    

    return (
        <>
            <form ref={challengeForm}>
                <div className="form-group">
                    {(props.name) ?
                    <input name="oppUser" className="form-control" value={props.name} disabled></input>
                    : (   
                        <>           
                            <label>Select The User You Want to Challenge</label>
                            <select className="form-control" id="usernameSelect" name="oppUser" onChange={handleInputChange}  placeholder="username">
                                <option defaultValue>Choose...</option>
                                {users.map(u => (u._id !== user._id)&&(
                                <option key={u._id} >{u.username}</option>
                                    ))}
                            </select>
                        </>
                    )}
                </div>
                <div className="form-group">
                    <label>Which Business Will You Support?</label>
                    {/* <LocationSearchInput/> */}
                    <input onChange={handleInputChange} name="cBusiness" className="form-control" type="text" placeholder="Enter business name"></input>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select Biz type:</label>
                    <select className="form-control" name="oppUser" id="exampleFormControlSelect1">
                        <option>Retail</option>
                        <option>Education</option>
                        <option>Food/Beverage</option>
                        <option>Tech</option>
                        <option>Other</option>
                    </select>
                </div> */}
                <div className="form-group">
                    <label>Let's Talk Mileage 🏁</label>
                    <Row>
                        <Col size="6">
                            <input onChange={handleInputChange} name="cMiles" className="form-control form-control-sm" type="text" placeholder="Distance in Miles"></input>
                        </Col>
                        <Col size="6">
                            <input onChange={handleInputChange} name="cDonation" className="form-control form-control-sm" type="text" placeholder="$ Amount per Mile"></input>
                        </Col>
                    </Row>
                </div>
                <hr></hr>                
                <Row>
                    <Col size="6">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel} data-dismiss="modal"><i className="fa fa-eject mr-2"/>Cancel</button>
                    </Col>
                    <Col size="6">
                        <button type="button" className="btn btn-success" onClick={handleChallengeSave} data-dismiss="modal" disabled={!(formObject.oppUser && formObject.cBusiness && formObject.cMiles && formObject.cDonation)}><i className="fa fa-paper-plane mr-2"/>Send Challenge</button>
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default ChallengeForm