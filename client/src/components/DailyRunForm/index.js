import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";
import "./dailyRunForm.css";

function DailyRunForm() {
    const [runningStats, setRunningStats] = useState([]);
    const [formObject, setFormObject] = useState({
      pace:0,
      distance:0,
      date:new Date(),
      totalTime:0
    });
    const {date} = formObject;
    const formEl = useRef(null);
    
    function handleInputChange(event) {
      if (typeof event === 'object') {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      } else {
        setFormObject({...formObject, date: event})
      }
    };

    function onDateChange(name,value){
      console.log("Date is", name, value);
      setFormObject({...formObject, [name]: value})
    } 
    
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(formObject.date);
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
              console.log(res);
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
                <div className="form-group">
                <DatePicker
                  onChange={date => onDateChange('date', date)}
                  name="date"
                  className="form-control"
                  selected={date}
                  placeholder="Date(required)"
                />
                </div>
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