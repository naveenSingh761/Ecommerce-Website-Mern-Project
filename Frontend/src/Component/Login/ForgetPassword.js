import React, { useEffect, useState } from "react";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { forgotHandler } from "../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const ForgetPassword = () => {
  const [send, setSend] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (send) {
      console.log(email);
      const formData = new FormData();
      formData.append("email", email);
      dispatch(forgotHandler(formData, navigate));
    }
  }, [send]);

  
  return (
    <>
      <div className="__Forgotcontainer">
        <div>
          <div className="text-center">
            <p> Email your email</p>
            <label htmlFor="">
              <MarkunreadIcon color="warning" />
            </label>
            {!send && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    setSend(true);
                  }}
                >
                  <AlternateEmailIcon />
                  Submit
                </button>
              </>
            )}
          </div>
        </div>
        {send && (
          <div>
            <h2>
              An Email With password Reset link has been send on your mail
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgetPassword;
