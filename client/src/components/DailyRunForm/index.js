import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";
import LineChart from "../LineChart";
import "./dailyRunForm.css";
import { useAlert } from 'react-alert'

function DailyRunForm(props) {
  const [formObject, setFormObject] = useState({
    pace:0,
    distance:0,
    date:new Date(),
    totalTime:0
  });
  const {date} = formObject;
  const formEl = useRef(null);
  const alert = useAlert();

    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormObject({...formObject, [name]: value})
    };

    function onDateChange(name,value){
      setFormObject({...formObject, [name]: value})
    } 
    
    function handleFormSubmit(event) {
        event.preventDefault();
        const formatteddate = moment(date).format('YYYY-MM-DD'); 
        console.log("Date is", formatteddate);
        // const pace = formObject.distance / formObject.totalTime;
        if (formObject.distance && formObject.totalTime) {
          API.saveRunningStat({
            // pace: pace,
            distance: formObject.distance,
            date: formObject.formatteddate,
            totalTime: formObject.totalTime
          })
            .then(res => {
              formEl.current.reset();
              alert.success('Race Saved!');
              props.handleLineChart();
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
                  Submit race
                </FormBtn>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </form>
        </>
    )
}

export default DailyRunForm;