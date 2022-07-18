import { Joi } from 'express-validation';

function create(req, res, next) {

  console.log(req.body)
  
  const bodySchema = Joi.object({
    name: Joi.string().required()
  })

  const { error, value } = bodySchema.validate(req.body);

  if (error) {
    const details = { ...error.details[0] }
    delete details.message

    return res.status(400).json({
      error: 'ValidationError',
      message: error.details[0].message,
      details
    })
  }
  next()
}

function update(req, res, next) {
  const paramsSchema = Joi.object({
    id: Joi.number().required()
  });
  const bodySchema = Joi.object({
    name: Joi.string().required()
  });

  let { error, value } = paramsSchema.validate(req.params);
  if (error) {
    const details = { ...error.details[0] };
    delete details.message;
    return res.status(400).json({
      error: 'ValidationError',
      message: error.details[0].message,
      details
    });
  } 

  ({ error, value } = bodySchema.validate(req.body));
  if (error) {
    const details = { ...error.details[0] };
    delete details.message;
    return res.status(400).json({
      error: 'ValidationError',
      message: error.details[0].message,
      details
    });
  } 
  next();
}


export default { 
  create,
  update
}