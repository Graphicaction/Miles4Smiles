import React, { useState, useRef, useContext } from 'react';
import API from '../../utils/API';
import AUTH from '../../utils/AUTH';
import UserContext from '../../utils/UserContext';
import Jdenticon from 'react-jdenticon';
import { Input } from '../Form';
import { Row, Col } from '../Grid';

//form to accept, deny or log challenge outcomes, nested inside Update ChallengeModal
function UpdateChallengeForm(props) {
  const { user, users, setUser } = useContext(UserContext);
  const [formObject, setFormObject] = useState([]);
  const challengeForm = useRef(null);

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
    if (formObject.loser) {
      //Getting the username of winner and loser
      if (formObject.loser === props.challengers[0]) {
        winner = props.challengers[1];
        loser = props.challengers[0];
      } else {
        winner = props.challengers[0];
        loser = props.challengers[1];
      }
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
      //Update challenge record with status and donor
      API.updateChallenge(props.id, {
        donor: formObject.loser,
        status: 'finish',
      })
        .then((res) => {
          challengeForm.current.reset();
          props.handleChallenge();
        })
        .catch((err) => {
          console.log(err);
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
    }
  }

  return (
    <>
      <form ref={challengeForm}>
        <div className="form-group text-center">
          <label>Who lost and will donate to {props.business}?</label>
          <br></br>
          <br></br>
          <Row>
            <Col size="6">
              <div className="radio">
                <label>
                  <Jdenticon
                    className="avatar"
                    size="48"
                    value={props.challengers[0]}
                    float="right"
                  ></Jdenticon>
                  <Input
                    type="radio"
                    value={props.challengers[0]}
                    name="loser"
                    onChange={handleInputChange}
                  />
                  {props.challengers[0]}
                </label>
              </div>
            </Col>
            <Col size="6">
              <div className="radio">
                <label>
                  <Jdenticon
                    className="avatar"
                    size="48"
                    value={props.challengers[1]}
                    float="right"
                  ></Jdenticon>

                  <Input
                    type="radio"
                    value={props.challengers[1]}
                    name="loser"
                    onChange={handleInputChange}
                  />
                  {props.challengers[1]}
                </label>
              </div>
            </Col>
          </Row>
          <small className="form-text text-muted">
            Enter the user who ran the set distance at a slower pace.
          </small>
        </div>
        <hr></hr>
        <button
          type="button"
          className="btn btn-secondary mr-5"
          data-dismiss="modal"
        >
          <i className="fa fa-eject mr-2" />
          Cancel
        </button>
        <button
          type="button"
          className="btn"
          onClick={handleChallengeSave}
          data-dismiss="modal"
          style={{ backgroundColor: '#89b0ae' }}
          disabled={!formObject.loser}
        >
          <i className="fa fa-paper-plane mr-2" />
          Submit Challenge
        </button>
      </form>
    </>
  );
}

export default UpdateChallengeForm;
