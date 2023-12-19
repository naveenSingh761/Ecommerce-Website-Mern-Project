import React, { useEffect, useState } from "react";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { forgotHandler, resetHandler } from "../../Actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader";

const ResetPassword = () => {
  const [send, setSend] = useState(false);
  const [newPassword, setnewPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const params = useParams();
  const token = params.token;

  useEffect(() => {
    if (send && !newPassword && !confirmPassword) {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);
      dispatch(resetHandler(formData, token, navigate));
    }
  }, [send]);
  return loading ? (
    <Loader />
  ) : (
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
                  type="password"
                  placeholder="NewPassword"
                  onChange={(event) => {
                    setnewPassword(event.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="ConfirmPassword"
                  onChange={(event) => {
                    setconfirmPassword(event.target.value);
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

export default ResetPassword;
