import React from "react";
import UpdateChallengeForm from "../../components/UpdateChallengeForm/UpdateChallengeForm";
import { PromiseProvider } from "mongoose";

function UpdateChallengeModal(props) {

  return (
    <>
      <div className="modal fade"  tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Complete challenge details below:</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <UpdateChallengeForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateChallengeModal