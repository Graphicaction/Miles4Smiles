import React, { useState, useRef, useContext } from 'react';
import { useAlert } from 'react-alert';
import AUTH from '../../utils/AUTH';
import { Input, FormBtn } from '../Form';
import UserContext from '../../utils/UserContext';
import validateUpdate from './validateUpdate';
import './Update.scss';

function UpdateForm(props) {
  const { user, setUser } = useContext(UserContext);
  const [formObject, setFormObject] = useState({
    averagePace: '',
    averageDistance: '',
  });
  const formEl = useRef(null);
  const alert = useAlert();

  const paceSelector = [
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validUpdate = validateUpdate(
      formObject.averageDistance,
      formObject.averagePace
    );
    if (validUpdate) {
      if (formObject.averagePace && formObject.averageDistance) {
        AUTH.userUpdate(user._id, {
          averageDistance: formObject.averageDistance,
          averagePace: formObject.averagePace,
        })
          .then((res) => {
            setUser(res.data);
            props.handleUserUpdate();
            formEl.current.reset();
            alert.success('User info updated successfully!');
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert.error('Please enter numbers only!');
    }
  };
  return (
    <>
      <form ref={formEl}>
        <Input
          onChange={handleInputChange}
          name="averageDistance"
          placeholder="update average distance in miles"
        />
        <select
          className="form-control"
          id="paceSelector"
          name="averagePace"
          onChange={handleInputChange}
          placeholder="update average pace per mile"
        >
          <option defaultValue>Choose...</option>
          {paceSelector.map((pace, i) => (
            <option key={i}>{pace}</option>
          ))}
        </select>
        <FormBtn
          id="updateBtn"
          disabled={!(formObject.averageDistance && formObject.averagePace)}
          onClick={handleFormSubmit}
        >
          Update my User Account
        </FormBtn>
        <button type="button" className="btn userUpdate" data-dismiss="modal">
          Cancel
        </button>
      </form>
    </>
  );
}

export default UpdateForm;
