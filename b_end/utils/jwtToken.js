// create Token and Sava Token

export const sentToken = async (user, statuscode, res, message) => {
  const token = await user.getJWTTOKEN();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httponly: true,
  };

  res
    .status(statuscode)
    .cookie("Ltoken", token, options)
    .send({
      success: true,
      user,
      message: message || " Ok ",
    });
};
