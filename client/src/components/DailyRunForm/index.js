import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Input, FormBtn } from "../Form";
import API from "../../utils/API";
import BarChart from "../BarChart";
import "./dailyRunForm.scss";
import { useAlert } from 'react-alert'
import {Row, Col} from "../Grid"

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
              props.handleBarChart();
            })
            .catch(err => console.log(err));
        }
      };
    return (
        <>
            <form ref={formEl}>
              <Row>
                <Col size="3">
              <div className="radio">
                <label>
                  <Input type="radio" value="5"name="distance"  onChange={handleInputChange}/>
                  5K
                </label>
              </div>
              </Col>
              <Col size="3">
              <div className="radio">
                <label>
                  <Input type="radio" value="10"name="distance"  onChange={handleInputChange}/>
                  10K
                </label>
              </div>
              </Col>
              <Col size="3">
              <div className="radio">
                <label>
                  <Input type="radio" value="21"name="distance"  onChange={handleInputChange}/>
                  21K Half Marathon
                </label>
              </div>
              </Col>
              <Col size="3">
              <div className="radio">
                <label>
                  <Input type="radio" value="42"name="distance" onChange={handleInputChange}/>
                  42K Marathon
                </label>
              </div>
              </Col>
              </Row>
                {/* <Input
                  onChange={handleInputChange}
                  label="5K"
                  name="distance"
                  placeholder="Distance (required)"
                  type="radio"
                  value="5"
                /> */}
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