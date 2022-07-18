import { Joi } from 'express-validation';
import createMessage from './utils.js';

function create(req, res, next) {

  console.log(req.body)

  const bodySchema = Joi.object({
    name: Joi.string().required()
  })

  const { error, value } = bodySchema.validate(req.body);

  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message)
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
    const message = createMessage(error);
    return res.status(400).json(message)
  }
  next()

  ({ error, value } = bodySchema.validate(req.body));
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message)
  }
  next()
}


export default {
  create,
  update
}