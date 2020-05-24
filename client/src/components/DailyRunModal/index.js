import React from "react";
import DailyRunForm from "../../components/DailyRunForm";


function DailyRunModal() {

  return (
    <>
      <button type="button" className="btn" id="start-challenge" data-toggle="modal" data-target="#exampleModal">Submit Run</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Submit a Run</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <DailyRunForm />
                  </div>
                </div>
              </div>
            </div>
    </>
  );
}

export default DailyRunModal;