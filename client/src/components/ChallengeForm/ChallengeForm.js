import React, { useState, useRef, useContext } from 'react';
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import { useAlert } from 'react-alert';
import { Row, Col } from '../Grid';
import LocationSearchInput from '../../utils/GPlaces';
import validateChallenge from './validateChallenge';

function ChallengeForm(props) {
  const [address, setAddress] = useState();
  const [businessName, setBusinessName] = useState();
  const [businessUrl, setBusinessUrl] = useState();
  const [businessType, setBusinessType] = useState();
  const { user, users } = useContext(UserContext);
  const [formObject, setFormObject] = useState([]);
  const challengeForm = useRef(null);
  const alert = useAlert();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  const handleBusiness = (address, businessName, businessUrl, businessType) => {
    setAddress(address);
    setBusinessName(businessName);
    setBusinessUrl(businessUrl);
    setBusinessType(businessType);
  };

  const clearBusiness = () => {
    setAddress('');
  }

  //Saving new challenge
  function handleChallengeSave(event) {
    event.preventDefault();
    let challengers;
    //assigning values in challengers array depending upon welcome / mypage call and validating inputs
    let valid;
    if (props.name) {
      challengers = [user.username, props.name];
      valid = validateChallenge(
        props.name,
        formObject.cMiles,
        formObject.cDonation,
        formObject.cBusiness
      );
    } else {
      challengers = [user.username, formObject.oppUser];
      valid = validateChallenge(
        formObject.oppUser,
        formObject.cMiles,
        formObject.cDonation,
        businessName
      );
    }
    const donation = formObject.cMiles * formObject.cDonation;
    if (valid) {
      API.saveChallenge({
        challengers: challengers,
        businessName: businessName,
        distance: formObject.cMiles,
        donatedAmount: donation,
        donor: '',
        status: 'Waiting for Response',
        businessLocation: address,
        businessUrl: businessUrl,
        businessType: businessType,
      })
        .then((res) => {
          alert.success('Challenge Saved!');
          challengeForm.current.reset();
          formObject.cMiles = '';
          formObject.cDonation = '';
          if (props.handleChallenge) props.handleChallenge();
          // clearBusiness('');
          // console.log(address);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert.error('Please enter valid inputs!');
    }
  }

  function handleCancel() {
    challengeForm.current.reset();
  }
    
  return (
    <>
      <form ref={challengeForm}>
        <div className="form-group">
          {props.name ? (
            <input
              name="oppUser"
              className="form-control"
              value={props.name}
              disabled
            ></input>
          ) : (
            <>
              <label>Select The User You Want to Challenge</label>
              <select
                className="form-control"
                id="usernameSelect"
                name="oppUser"
                onChange={handleInputChange}
                placeholder="username"
              >
                <option defaultValue>Choose...</option>
                {users.map(
                  (u) =>
                    u._id !== user._id && (
                      <option key={u._id}>{u.username}</option>
                    )
                )}
              </select>
            </>
          )}
        </div>
        <div className="form-group">
          <label>Which Business Will You Support?</label>
          <LocationSearchInput handleBusiness={handleBusiness} clearBusiness={clearBusiness}/>
        </div>
        <div className="form-group">
          <label>
            Let's Talk Mileage{' '}
            <span role="img" aria-label="checkeredflag">
              🏁
            </span>
          </label>
          <Row>
            <Col size="6">
              <input
                onChange={handleInputChange}
                name="cMiles"
                className="form-control form-control-sm"
                type="text"
                placeholder="Distance in Miles"
              ></input>
            </Col>
            <Col size="6">
              <input
                onChange={handleInputChange}
                name="cDonation"
                className="form-control form-control-sm"
                type="text"
                placeholder="$ Amount per Mile"
              ></input>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <Row>
          <Col size="6">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              data-dismiss="modal"
            >
              <i className="fa fa-eject mr-2" />
              Cancel
            </button>
          </Col>
          <Col size="6">
            <button
              type="button"
              className="btn sendChallenge"
              onClick={handleChallengeSave}
              data-dismiss="modal"
              disabled={!(formObject.cMiles && formObject.cDonation)}
            >
              <i className="fa fa-paper-plane mr-2" />
              Send Challenge
            </button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default ChallengeForm;
