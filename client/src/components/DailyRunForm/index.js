import React, { useState, useRef } from "react";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";

function DailyRunForm() {
    const [runningStats, setRunningStats] = useState([]);
    const [formObject, setFormObject] = useState({});
    const formEl = useRef(null);
    
    function loadRunningStats() {
        API.getRunningStats()
          .then(res => {
            // console.log(res.data.RunningStats);
            setRunningStats(res.data.runningStats);
          })
          .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        const pace = formObject.distance / formObject.totalTime;
        if (formObject.distance && formObject.totalTime) {
          API.saveRunningStat({
            pace: pace,
            distance: formObject.distance,
            date: formObject.date,
            totalTime: formObject.totalTime
          })
            .then(res => {
              formEl.current.reset();
              loadRunningStats();
            })
            .catch(err => console.log(err));
        }
      };
    return (
        <>
            <form ref={formEl}>
                <Input
                  onChange={handleInputChange}
                  name="distance"
                  placeholder="Distance (required)"
                />
                <Input
                  onChange={handleInputChange}
                  name="date"
                  placeholder="Date"
                />
                <Input
                  onChange={handleInputChange}
                  name="totalTime"
                  placeholder="Total Time (required)"
                />
                <FormBtn
                  disabled={!(formObject.distance && formObject.totalTime)}
                  onClick={handleFormSubmit} >
                  Submit a run
                </FormBtn>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </form>
        </>
    )
}

export default DailyRunForm;