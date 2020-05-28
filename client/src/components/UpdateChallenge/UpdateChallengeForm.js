import React, { useState, useRef } from "react";
import API from "../../utils/API";


function UpdateChallengeForm(props) {

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
        API.updateChallenge(props.id,{doner: formObject.loser})
        .then(res => {
            challengeForm.current.reset();
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