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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
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
  }
  return (
    <>
      <form ref={formEl}>
        <Input
          onChange={handleInputChange}
          name="averageDistance"
          placeholder="update average distance in miles"
        />
        <Input
          onChange={handleInputChange}
          name="averagePace"
          placeholder="update average pace per mile"
        />
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
