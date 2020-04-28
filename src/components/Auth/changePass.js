import React from "react";
import "../../assets/auth/changePass.scss";

function changePass({
  handleNewPassword,
  handleConfPassword,
  handleChangePassSubmit,
  props,
}) {
  return (
    <div className="mainChangePass">
      <div className="newPasswords">
        <h2>Changing password</h2>
        <p>
          Please note that when changing your password, we ask you to set
          yourself a secure password that contains both uppercase and lowercase
          letters as well as numbers. This is for your own safety.
        </p>
        <label htmlFor="newPass">New password</label>
        <br />
        <input
          type="password"
          id="newPass"
          value={props.newPassword}
          onChange={handleNewPassword}
        />
        <br />
        <label htmlFor="confPass">Confirm new password</label>
        <br />
        <input
          type="password"
          id="confPass"
          value={props.confPassword}
          onChange={handleConfPassword}
        />
        <button onClick={handleChangePassSubmit}>Change password</button>
      </div>
    </div>
  );
}

export default changePass;
