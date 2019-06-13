import React from 'react';

export default function DeleteAccount({ deleteAccount, closeModal, show }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'; 
  return (
    <div>
      <div className={showHideClassName}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Account</h5>
              <button type="button" onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete your account?</p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={deleteAccount} className="btn btn-danger">Delete</button>
              <button type="button" onClick={closeModal} className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
