import { Categories } from "../models/index.js";

class CategoryController {
  async store(req, res) {
    const categories = await Categories.findAll({
      attributes: [ 'id', 'name' ]
    });
    return res.status(200).json(categories);
  }
  
  async create(req, res) {
    const {name} = req.body;
    const newCategory = await Categories.create({
      name,
    })
    console.log(newCategory)
    delete newCategory.dataValues.createdAt;
    delete newCategory.dataValues.updatedAt;
    return res.status(201).json(newCategory);
  }

  async update(req, res) {
    await Categories.update({
      name: req.body.name
    }, {
      where: { id: req.params.id },
    })
    const updatedCategory = await Categories.findByPk(req.params.id);
    delete updatedCategory.dataValues.createdAt;
    delete updatedCategory.dataValues.updatedAt;
    return res.status(200).json(updatedCategory);
  }
}

export default new CategoryController();
