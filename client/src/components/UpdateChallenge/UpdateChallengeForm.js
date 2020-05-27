import React, { useState, useRef } from "react";
import API from "../../utils/API";


function UpdateChallengeForm() {

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
        const donation = formObject.cMiles * formObject.cDonation;
        const id = "5ecde1d197381c630151eeed";
        //  ^need to get id from when we load the challenge into the card

        // need to pass loggedin user to this comp so we can set current user to "challengers" then push accepting user... or maybe this gets done on the updateChallenge operation later?
        
        API.updateChallenge({
            _id: id,
            doner: formObject.loser
        })
        .then(res => {
            console.log(res.data);
            alert("Challenge updated!");
            // ^this is ugly but just a reminder for me to figure out how to display the SuccessAlert compo later...
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
                    <label htmlFor="exampleInputEmail1">Who lost?</label>
                    <input onChange={handleInputChange} name="loser" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                    <small id="emailHelp" className="form-text text-muted">Enter the user who failed to complete the challenge distance with the fastest time</small>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-success" onClick={handleChallengeSave} data-dismiss="modal">Submit challenge</button>
                </div>
            </form>
        </>
    )
}

export default UpdateChallengeForm