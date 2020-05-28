import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import UserContext from "../../utils/UserContext";

function UpdateChallengeForm(props) {
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
        console.log("Challege card with id ",props.id);
        API.updateChallenge(props.id,{doner: formObject.loser})
        .then(res => {
            challengeForm.current.reset();
        })
        .catch(err => {
            console.log(err);
        });
        if(formObject.loser == user.username){
            const lost = user.challengesLost + 1;
            AUTH.userUpdate(user._id, {challengesLost: lost})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            const won = user.challengesWon + 1;
            AUTH.userUpdate(user._id, {challengesWon: won})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        }
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