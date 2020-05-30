import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import UserContext from "../../utils/UserContext";
import { useAlert } from 'react-alert'

function ChallengeForm(props) {
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
        const challengers = [user.username, formObject.oppUser];
        const donation = formObject.cMiles * formObject.cDonation;
        console.log("challengers array:",challengers);
        
        API.saveChallenge({
            challengers: challengers,
            businessName: formObject.cBusiness,
            distance: formObject.cMiles,
            donatedAmount: donation,
            donor: "",
            status:"Waiting for Response"
        })
        .then(res => {
            console.log(res.data);
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
                    <label>Enter a user to challenge</label>
                    <select className="form-control" id="usernameSelect" name="oppUser" onChange={handleInputChange}  placeholder="username">
                        <option defaultValue>Choose...</option>
                           {users.map((u, i) => (
                        <option key={i} >{u.username}</option>
                            ))}
                    </select>
                    {/* <input  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" className="form-text text-muted">***Later this will be users db search***</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Which Biz will you run for?</label>
                    <input onChange={handleInputChange} name="cBusiness" className="form-control" type="text" placeholder="Enter business name"></input>
                    <small id="emailHelp" className="form-text text-muted">***Later this will be Local Business API search***</small>
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
                    <label htmlFor="exampleInputEmail1">Let's talk milage 🏁</label>
                    <input onChange={handleInputChange} name="cMiles" className="form-control form-control-sm" type="text" placeholder="Enter proposed challenge distance in miles"></input>
                    <input onChange={handleInputChange} name="cDonation" className="form-control form-control-sm" type="text" placeholder="Enter donation amount per mile in USD"></input>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-success" onClick={handleChallengeSave} data-dismiss="modal">Save challenge</button>
                </div>
            </form>
        </>
    )
}

export default ChallengeForm