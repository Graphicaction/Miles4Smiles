import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { useAlert } from 'react-alert'
import {Row, Col} from "../Grid"

function ChallengeForm(props) {
    //const { user } = useContext(UserContext);
    const { user, users } = useContext(UserContext);
    const [challengeData, setChallenges] = useState([]);
    const [formObject, setFormObject] = useState([]);
    const challengeForm = useRef(null);
    const alert = useAlert();
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };


    function handleChallengeSave(event) {
        event.preventDefault();
        let challengers;
        if(props.name){
            challengers = [user.username, props.name];}
        else{
            challengers = [user.username, formObject.oppUser];}
        const donation = formObject.cMiles * formObject.cDonation;
        
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
            props.handleChallenge();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <form ref={challengeForm}>
                <div className="form-group">
                    <label>Select A User To Challenge</label>
                    {(props.name) ?
                    <input name="oppUser" className="form-control" value={props.name} disabled></input>
                    : (   
                        <>           
                            <label>Select The User You Want to Challenge</label>
                            <select className="form-control" id="usernameSelect" name="oppUser" onChange={handleInputChange}  placeholder="username">
                                <option defaultValue>Choose...</option>
                                {users.map((u, i) => (
                                <option key={i} >{u.username}</option>
                                    ))}
                            </select>
                        </>
                    )}
                    {/* <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" className="form-text text-muted">***Later this will be users db search***</small> */}
                </div>
                <div className="form-group">
                    <label>Which Business Will You Support?</label>
                    <input onChange={handleInputChange} name="cBusiness" className="form-control" type="text" placeholder="Enter business name"></input>
                    <small className="form-text text-muted">***Later this will be Local Business API search***</small>
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
                    <label>Let's Talk Milage 🏁</label>
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
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"><i className="fa fa-eject mr-2"/>Cancel</button>
                    </Col>
                    <Col size="6">
                        <button type="button" className="btn btn-success" onClick={handleChallengeSave} data-dismiss="modal"><i className="fa fa-paper-plane mr-2"/>Send Challenge</button>
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default ChallengeForm