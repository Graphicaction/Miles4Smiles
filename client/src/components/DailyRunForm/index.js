import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Input, FormBtn } from '../Form';
import API from '../../utils/API';
import './dailyRunForm.scss';
import validateRun from './validateRun';
import { useAlert } from 'react-alert';
import { Row, Col } from '../Grid';

//Used in DailyRun Modal and appears when "log a race" in mypage is clicked
function DailyRunForm(props) {
  const [formObject, setFormObject] = useState({
    pace: 0,
    distance: 0,
    date: new Date(),
    totalTime: 0,
  });
  const { date } = formObject;
  const formEl = useRef(null);
  const alert = useAlert();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function onDateChange(name, value) {
    setFormObject({ ...formObject, [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const validParams = validateRun(
      formObject.distance,
      formattedDate,
      formObject.totalTime
    );
    if (validParams) {
      if (formObject.distance && formObject.totalTime) {
        API.saveRunningStat({
          distance: formObject.distance,
          date: formattedDate,
          totalTime: formObject.totalTime,
        })
          .then((res) => {
            formEl.current.reset();
            formObject.distance = '';
            formObject.totalTime = '';
            alert.success('Race Saved!');
            props.handleBarChart();
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert.error('Please enter valid input');
    }
  }
  //returns race run form
  return (
    <>
      <form ref={formEl}>
        <Row>
          <Col size="3">
            <div className="radio">
              <label htmlFor="5k">
                <Input
                  type="radio"
                  value="5"
                  name="distance"
                  onChange={handleInputChange}
                  id="5k"
                />
                5K
              </label>
            </div>
          </Col>
          <Col size="3">
            <div className="radio">
              <label htmlFor="10k">
                <Input
                  type="radio"
                  value="10"
                  name="distance"
                  onChange={handleInputChange}
                  id="10k"
                />
                10K
              </label>
            </div>
          </Col>
          <Col size="3">
            <div className="radio">
              <label htmlFor="21k">
                <Input
                  type="radio"
                  value="21"
                  name="distance"
                  onChange={handleInputChange}
                  id="21k"
                />
                Half Marathon
              </label>
            </div>
          </Col>
          <Col size="3">
            <div className="radio">
              <label htmlFor="42k">
                <Input
                  type="radio"
                  value="42"
                  name="distance"
                  onChange={handleInputChange}
                  id="42k"
                />
                Marathon
              </label>
            </div>
          </Col>
        </Row>
        <div className="form-group">
          <DatePicker
            onChange={(date) => onDateChange('date', date)}
            name="date"
            className="form-control"
            selected={date}
            placeholder="Date (required)"
          />
        </div>
        <Input
          onChange={handleInputChange}
          name="totalTime"
          placeholder="Total Time (required)"
        />
        <FormBtn
          disabled={!(formObject.distance && formObject.totalTime)}
          onClick={handleFormSubmit}
        >
          {' '}
          <i className="fa fa-floppy-o" aria-hidden="true"></i> Submit race
        </FormBtn>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default DailyRunForm;
