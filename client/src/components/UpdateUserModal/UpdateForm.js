import React, {useState, useRef, useContext} from "react"
import AUTH from "../../utils/AUTH"
import {Input, FormBtn} from "../Form";
import UserContext from "../../utils/UserContext";



function UpdateForm() {
  const { user } = useContext(UserContext);

  const [isSaved, setSaved] = useState(false);
  const [formObject, setFormObject] = useState({
    averagePace: "",
    averageDistance: "",
  });
  const formEl = useRef(null);

    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormObject({...formObject, [name]: value})
    };
    
    function handleFormSubmit(event) {
        event.preventDefault();
 
        if (formObject.averagePace && formObject.averageDistance) {
          AUTH.update(user._id,{
            // ...user,
            // username: formObject.username,
            // password: formObject.password,
            averageDistance: (formObject.averageDistance),
            averagePace: parseInt(formObject.averagePace),
            // city: formObject.city,
            // state: formObject.state,
          })
            .then(res => {
              console.log(res.data)
              formEl.current.reset();
              setSaved(true);
            })
            .catch(err => console.log(err));
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