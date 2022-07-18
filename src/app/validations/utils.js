export default function createMessage(error) {

  const details = { ...error.details[0] };
  delete details.message;

  const message = {
    error: 'ValidationError',
    message: error.details[0].message,
    details
  };

  return message;
}
