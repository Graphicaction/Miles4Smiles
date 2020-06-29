import React, { useState, useRef, useContext } from 'react';
import API from '../../utils/API';
import AUTH from '../../utils/AUTH';
import UserContext from '../../utils/UserContext';
import { Input } from '../Form';
import { useAlert } from 'react-alert';
import validateUpdateChallenge from './validateUpdateChallenge';

//form to accept, deny or log challenge outcomes, nested inside Update ChallengeModal
function UpdateChallengeForm(props) {
  const { user, users, setUser } = useContext(UserContext);
  const [formObject, setFormObject] = useState([]);
  const challengeForm = useRef(null);
  const {time, setTime} = useState(0);
  const alert = useAlert();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleChallengeSave(event) {
    event.preventDefault();
    let winnerId = '',
      loserId = '',
      winner = '',
      loser = '';
    let won = 0,
      lost = 0;
    let valid = validateUpdateChallenge(formObject.time);
    if(valid) {
      let strTime = formObject.time.split(':');
      let hoursMinutes = parseInt(strTime[0] * 60) + parseInt(strTime[1]);
      let newTime = [], waiting, donor;
      //Getting the time index according to current user
      if(user.username === props.challengers[0]) {
        newTime = [hoursMinutes, props.time[1]];
        if(props.time[1] == 0){
         alert.success("Waiting for another challenger to enter time!");
         waiting = true;
        }else{
          if(parseInt(props.time[1]) < hoursMinutes){
            donor = user.username;
            winner = props.challengers[1];
            loser = user.username;
            alert.success("You Lost the challenge, Please donate!");
          } else{
            donor = props.challengers[1];
            winner = user.username
            loser = props.challengers[1];
            alert.success("You Won the challenge, Congratulations!");
          } 
        }
      }
      if(user.username === props.challengers[1]) {
        newTime = [props.time[0], hoursMinutes];
        if(props.time[0] == 0){
          alert.success("Waiting for another challenger to enter time!");
          waiting = true;
        }else{
          if(parseInt(props.time[0]) < hoursMinutes) {
            donor = user.username;
            winner = props.challengers[0];
            loser = user.username;
            alert.success("You Lost the challenge, Please donate!");
          } else{
            donor = props.challengers[0];
            winner = user.username
            loser = props.challengers[0];
            alert.success("You Won the challenge, Congratulations!");
          }  
        }
      }
      // //Update challenge record with status and donor
        if(!waiting){
          API.updateChallenge(props.id, {
            donor: donor,
            time: newTime,
            status: 'finish',
          })
            .then((res) => {
              challengeForm.current.reset();
              props.handleChallenge();
            })
            .catch((err) => {
              console.log(err);
            });
          //extracting the userid and challengesWon/Lost of winner/Loser
          users.forEach((u) => {
            if (u.username === winner) {
              winnerId = u._id;
              won = u.challengesWon + 1;
            }
            if (u.username === loser) {
              loserId = u._id;
              lost = u.challengesLost + 1;
            }
          });
          // Update winner and loser (users) record with challengeWon or lost
          AUTH.userUpdate(winnerId, { challengesWon: won })
            .then((res) => {
              if (winnerId === user._id) setUser(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
          AUTH.userUpdate(loserId, { challengesLost: lost })
            .then((res) => {
              if (loserId === user._id) setUser(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          API.updateChallenge(props.id, {
            time: newTime,
          })
            .then((res) => {
              challengeForm.current.reset();
              props.handleChallenge();
            })
            .catch((err) => {
              console.log(err);
            });
        }
    }else alert.error("Please enter valid time(hh:mm / h:mm)!")
  }

  return (
    <>
      <form ref={challengeForm}>
        <div className="form-group text-center">
          <label className="mb-4">Enter time you needed to complete the challenge race:</label>
            
              <div>
                <label htmlFor="loserOption1">
                  <Input
                    type="text"
                    value={time}
                    name="time"
                    onChange={handleInputChange}
                    placeholder = "1:30"
                    id="raceTime"
                  />
                </label>
              </div>
           
        </div>
        <hr></hr>
        <button
          type="button"
          className="btn btn-secondary mr-5"
          data-dismiss="modal">
          <i className="fa fa-eject mr-2" />
          Cancel
        </button>
        <button
          type="button"
          className="btn"
          onClick={handleChallengeSave}
          data-dismiss="modal"
          style={{ backgroundColor: '#89b0ae' }}
          disabled={!formObject.time}
        >
          <i className="fa fa-paper-plane mr-2" />
          Submit Time
        </button>
      </form>
    </>
  );
}

export default UpdateChallengeForm;
