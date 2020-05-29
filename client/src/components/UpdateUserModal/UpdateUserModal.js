import React from "react";
import DailyRunForm from "../../components/DailyRunForm";


function UpdateUserModal() {

  return (
    <>
      <button type="button" className="btn" id="start-challenge" data-toggle="modal" data-target="#runModal">Log your Race</button>
            <div className="modal fade" id="runModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><i className="fa fa-paper-plane mr-2"></i>Race Logger</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <UpdateForm />
                  </div>
                </div>
              </div>
            </div>
    </>
  );
}

export default UpdateUserModal;