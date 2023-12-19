const catchAsyncError = (IncomingFunction) => (req, res, next) => {
  Promise.resolve(IncomingFunction(req, res, next)).catch(next);
};

export default catchAsyncError;
