import React, { Fragment, useContext } from 'react';
import RunningStats from '../../components/RunningStats/RunningStats';
import Jumbotron from '../../components/Jumbotron';
import './MyPage.scss';
import UserContext from '../../utils/UserContext';
import { PromiseProvider } from 'mongoose';

const MyPage = (props) => {
  const { user } = useContext(UserContext);

  let greeting;

  if (user === null) {
    greeting = <p>Hello guest</p>;
  } else if (user.firstName) {
    greeting = (
      <Fragment>
        <h4>
          Hello{' '}
          <strong>
            {user.firstName}, we are glad you are back ! Here is an overview of
            your latest races and challenges.
          </strong>
        </h4>
      </Fragment>
    );
  } else if (user.username) {
    greeting = (
      <Fragment>
        <h4>
          Hello{' '}
          <strong>
            {user.username}, we are glad you are back ! Here is an overview of
            your latest races and challenges.{' '}
          </strong>
        </h4>
      </Fragment>
    );
  }

  return (
    <>
      <div
        className="alert text-center"
        style={{ background: 'transparent', color: 'whitesmoke' }}
      >
        {greeting}
      </div>
      <RunningStats logout={props.logout} />
    </>
  );
};

export default MyPage;
