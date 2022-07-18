import { validate, Joi } from 'express-validation';
import createMessage from './utils.js';

function login(req, res, next) {
  const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}
// ##############################
function create(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}
// ###############################
function update(req, res, next) {
   const paramsSchema = Joi.object({
    id: Joi.number().required()
  });

  const bodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    newPassword: Joi.string().min(6),
    confirmPassword: Joi.string().min(6)
  }).min(1).when(Joi.object({
    password: Joi.exist()
  }).unknown(), {
    then: Joi.object({
      newPassword: Joi.required(),
      confirmPassword: Joi.required()
    }),
  }).when(Joi.object({
    newPassword: Joi.exist()
  }).unknown(), {
    then: Joi.object({
      password: Joi.required(),
    })
  }).when(Joi.object({
    confirmPassword: Joi.exist()
  }).unknown(), {
    then: Joi.object({
      password: Joi.required(),
    })
  });

  let { error, value } = paramsSchema.validate(req.params)
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }

  ({ error, value } = bodySchema.validate(req.body, { abortEarly: false }))
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}

// ###############################
function destroy(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required()
  });

  const { error, value } = schema.validate(req.params);
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}


export default {
  login,
  create,
  update,
  destroy
};