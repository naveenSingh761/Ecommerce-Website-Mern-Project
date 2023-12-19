import Errorhandler from "./Errorhandler.js";

const Erromiddleware = (err, req, res, next) => {
  // console.log(`error.js => Line number: 4 =>   `, err);
  console.log(`error.js => Line number: 4 =>   `, err.stack);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = ` Resouce not Found. Invalid ${err.path} `;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,

  });
};

export default Erromiddleware;
