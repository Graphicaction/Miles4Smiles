import React, { useState, useRef, useContext } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";
import UserContext from "../../utils/UserContext";
// import ChallengeContext from "../../utils/ChallengeContext"
import Jdenticon from "react-jdenticon";
import {Input} from "../Form";
import {Row, Col} from "../Grid"

function UpdateChallengeForm(props) {
    const { user, users } = useContext(UserContext);
    const [formObject, setFormObject] = useState([]);
    const challengeForm = useRef(null);


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function handleChallengeSave(event) {
        event.preventDefault();
        let userId = "";
        if(formObject.loser) {
            users.map(u => {
                if(u.username === formObject.loser) 
                    userId = u._id;
                console.log("result user",userId);
            })
            //Update challenge record with status and donor
            API.updateChallenge(props.id,{donor: formObject.loser, status: "finish"})
            .then(res => {
                challengeForm.current.reset();
                props.handleChallenge();
            })
            .catch(err => {
                console.log(err);
            });
            //Update user record with challengeWon or lost
            if(formObject.loser === user.username){
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
    }


    return (
        <>
            <form ref={challengeForm}>
                <div className="form-group text-center">
                    <label >Who lost and will donate to {props.business}?</label>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col size="6">
                            <div className="radio">
                                <label>
                                <Jdenticon className="avatar" size="48" value={props.challengers[0]} float="right"></Jdenticon>
                                    <Input type="radio" value={props.challengers[0]} name="loser"  onChange={handleInputChange}/>
                                    {props.challengers[0]}
                                </label>
                            </div>
                        </Col>
                        <Col size="6">
                            <div className="radio">
                                <label>
                                <Jdenticon className="avatar" size="48" value={props.challengers[1]} float="right"></Jdenticon>

                                    <Input type="radio" value={props.challengers[1]} name="loser"  onChange={handleInputChange}/>
                                    {props.challengers[1]}
                                </label>
                            </div>
                        </Col>
                    </Row>
                        {/* <input onChange={handleInputChange} name="loser" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input> */}
                    <small  className="form-text text-muted">Enter the user who ran the set distance at a slower pace.</small>
                </div>
                {/* <div className="modal-footer"> */}
                <hr></hr>
                    <button type="button" className="btn btn-secondary mr-5" data-dismiss="modal"><i className="fa fa-eject mr-2"/>Cancel</button>
                    <button type="button" className="btn" onClick={handleChallengeSave} data-dismiss="modal" style={{backgroundColor: "#89b0ae"}}><i className="fa fa-paper-plane mr-2"/>Submit Challenge</button>
                
            </form>
        </>
    )
}

export default UpdateChallengeForm