import { Users } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = JSON.parse(process.env.SECRET);

class UserController {
  async store(req, res) {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email'],
    });
    return res.status(200).json(users)
  }


  async login (req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {email}
    })
    if (!user) {
      return res.status(422).json({
        error: 'User no exists',
        message: 'User no exists',
        details: {
          info: 'email ${email} not found',
          value: email
        }
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        error: 'ValidationError',
        message: 'password incorrect',
        details: {
          path: ['password'],
          info: 'password incorrect'
        }
      })
    }
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      name: user.name
    }, secret.key, { 
      expiresIn: '2h'
    })

    return res.status(200).json({token: token})
  }

  async create(req, res) {
    const { name, email, password: pass } = req.body;
    const user = await Users.findOne({
      where: { email }
    });
    if (user) {
      return res.status(422).json({
        message: 'User already exists'
      });
    } else {
      const password = bcrypt.hashSync(pass, 10);
      const newUser = await Users.create({
        name,
        email,
        password
      })
      return res.status(201).json({
        id: newUser.id,
        nam: newUser.name,
        email: newUser.email,
      })
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, newPassword, confirmPassword } = req.body;

    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(422).json({
        error: 'User not found',
        message: 'User no exists',
        details: {
          info: `user with id ${id} no exists`,
          value: id
        }
      });
    }

    if (password) {
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          error: 'ValidationError',
          message: 'password incorrect',
          details: {
            path: ['password'],
            info: 'password incorrect'
          }
        })
      }

      if (!(newPassword === confirmPassword)) {
        return res.status(400).json({
          error: 'ValidationError',
          message: 'newPassword and confirmPassword are not equal',
          details: {
            path: ['newPassword', 'confirmPassword'],
            info: 'fields must be equal'
          }
        })
      }
      const passwordCrypted = bcrypt.hashSync(newPassword, 10);

      try {
        await Users.update({
          name: name ? name : user.name,
          password: passwordCrypted
        }, {
          where: { id }
        });
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({
          error: 'InternalServerError',
          message: 'Impossible process request'
        });
      }
    } else {
      try {
        await Users.update({
          name
        }, {
          where: { id }
        });
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({
          error: 'InternalServerError',
          message: 'Impossible process request'
        });
      }
    }
  }

  async delete(req, res) {
    if (Number(req.auth.id) !== Number(req.params.id)) {
      return res.status(403).json({
        error: 'AuthenticationError',
        message: 'trying to change data not owned',
        details: {
          path: 'users/:id',
          info: 'trying modify not owned data'
        }
      });
    }

    if (!(await Users.findByPk(req.auth.id))) {
      return res.status(403).json({
        error: 'user not found',
        message: 'user no exists'
      })
    }

    await Users.destroy({
      where: {
        id: req.auth.id
      }
    })

    return res.sendStatus(204)
  }
}

export default new UserController();