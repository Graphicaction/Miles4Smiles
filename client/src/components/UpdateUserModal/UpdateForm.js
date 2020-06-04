import React, {useState, useRef, useContext} from "react";
import { useAlert } from 'react-alert';
import AUTH from "../../utils/AUTH"
import {Input, FormBtn} from "../Form";
import UserContext from "../../utils/UserContext";
import validateUpdate from './validateUpdate';

function UpdateForm() {
  const { user } = useContext(UserContext);

  const [isSaved, setSaved] = useState(false);
  const [formObject, setFormObject] = useState({
    averagePace: "",
    averageDistance: "",
  });
  const formEl = useRef(null);
  const alert = useAlert();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };
    
    function handleFormSubmit(event) {
        event.preventDefault();
        const validUpdate = validateUpdate(formObject.averageDistance, formObject.averagePace);
        if(validUpdate){
          if (formObject.averagePace && formObject.averageDistance) {
            AUTH.userUpdate(user._id,{
              averageDistance: (formObject.averageDistance),
              averagePace: parseInt(formObject.averagePace),
            })
              .then(res => {
                console.log(res.data)
                formEl.current.reset();
                setSaved(true);
              })
              .catch(err => console.log(err));
          }
        }else {
          alert.success("Please enter numbers only!");
        }
      };
    return (
        <>
            <form ref={formEl}>
                {/* <Input
                  onChange={handleInputChange}
                  name="username"
                  placeholder="update username"
                />
                <Input
                  onChange={handleInputChange}
                  name="password"
                  placeholder="update password"
                /> */}
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
                {/* <Input
                  onChange={handleInputChange}
                  name="city"
                  placeholder="update city"
                />
                <Input
                  onChange={handleInputChange}
                  name="state"
                  placeholder="update state"
                /> */}
                <FormBtn id="updateBtn"
                  disabled={!(formObject.averageDistance && formObject.averagePace)}
                  onClick={handleFormSubmit} >
                  Update my User Account
                </FormBtn>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </form>
            {isSaved}
        </>
    )
}

export default UpdateForm;