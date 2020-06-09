import React from 'react';
import UpdateForm from './UpdateForm';
import './Update.scss';

function UpdateUserModal(props) {
  return (
    <>
      <button
        type="button"
        className="btn updateUser"
        id="update-user"
        data-toggle="modal"
        data-target="#user"
      >
        <i className="fa fa-edit mr-2" />
        Update Account
      </button>
      <div
        className="modal fade"
        id="user"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateUserInformation"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateUserInformation">
                <i className="fa fa-paper-plane mr-2"></i>Update Your
                Information
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <UpdateForm handleUserUpdate={props.handleUserUpdate} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUserModal;
