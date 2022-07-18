import { Joi } from 'express-validation';
import createMessage from './utils/index.js'

function index(req, res, next) {
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

function create(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    fabricante_id: Joi.number().required(),
    categories_ids: Joi.array().items(Joi.number())
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}

function update(req, res, next) {

  const paramsSchema = Joi.object({
    id: Joi.number().required()
  });
  const bodySchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    categories_ids: Joi.array().items(Joi.number())
  }).min(1);


  let { error, value } = paramsSchema.validate(req.params);
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }

  ({ error, value } = bodySchema.validate(req.body));
  if (error) {
    const message = createMessage(error);
    return res.status(400).json(message);
  }
  next();
}

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
  index,
  create,
  update,
  destroy
};