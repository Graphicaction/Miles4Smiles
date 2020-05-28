import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";

function ChallengeForm() {
    const { user } = useContext(UserContext);
    const [challengeData, setChallenges] = useState([]);
    const [formObject, setFormObject] = useState([]);
    const challengeForm = useRef(null);

    function loadChallenges() {
        API.getChallenges()
          .then(res => {
            setChallenges(res.data.challenges);
          })
          .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function handleChallengeSave(event) {
        event.preventDefault();
        const challengers = [user.username, formObject.oppUser];
        const donation = formObject.cMiles * formObject.cDonation;
        console.log("challengers array:",challengers);
        // need to pass loggedin user to this comp so we can set current user to "challengers" then push accepting user... or maybe this gets done on the updateChallenge operation later?
        
        API.saveChallenge({
            challengers: challengers,
            businessName: formObject.cBusiness,
            distance: formObject.cMiles,
            donatedAmount: donation
        })
        .then(res => {
            console.log(res.data);
            alert("Challenge saved!");
            //^this is ugly but just a reminder for me to figure out how to display the SuccessAlert compo later...
            challengeForm.current.reset();
            loadChallenges();
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <form ref={challengeForm}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter a user to challenge</label>
                    <input onChange={handleInputChange} name="oppUser" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" className="form-text text-muted">***Later this will be users db search***</small>
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