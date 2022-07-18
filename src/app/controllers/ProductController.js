import { Products, Manufacturers, Categories } from '../models/index.js';

const include = [ {
  model: Manufacturers,
  as: 'manufacturer',
  attributes: ['id', 'name']
}, {
  model: Categories,
  as: 'categories',
  attributes: ['id', 'name'],
  through: {
    attributes: []
  }
} ];
// ###########
class ProductController {

  async store(req, res) {
    const products = await Products.findAll({
      attributes: ['id', 'name', 'price'],
      include,
    })
    return res.status(200).json(products);
  }

  async index(req, res) {
    const { id } = req.params;

    const product = await Products.findByPk(id, {
      include
    })

    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found',
        message: 'Product not found'
      });
    }

    return res.status(200).json(product)

  }

  async create(req, res) {
    const { name, price, quantity, fabricante_id, categories_ids } = req.body

    let product = await Products.findOne({
      where: { name }
    });

    if (product) {
      return res.status(400).json({
        error: '400',
        message: `product with name '${name}' alrready exists`
      });
    }

    const newProduct = await Products.create({
      name,
      price,
      quantity,
      fabricante_id
    });

    if (categories_ids) {
      await Promise.all(
        categories_ids.map(async (id) => {
          const category = await Categories.findByPk(id)
          await newProduct.addCategories(category)
        })
      );
    }

    product = await Products.findByPk(newProduct.id, {
      attributes: ['id', 'name', 'price', 'quantity'],
      include
    });
    return res.status(200).json(product);
  }
  // #################### UPDATE ######################
  async update(req, res) {
    const id = parseInt(req.params.id)
    let product = await Products.findByPk(id)
    if (!product) {
      return res.status(400).json({
        error: 'Product not found',
        message: 'Product not found'
      });
    }

    const { name, price, quantity, categories_ids } = req.body;
    if (name) {
      const namedProduct = await Products.findOne({ where: { name } });
      if (namedProduct) {
        if (namedProduct.id !== (id)) { 
          return res.status(400).json({
            error: '400',
            message: `product with name '${name}' already exists`
          })
        }
      }
    }

    await Products.update({
      name: name ? name : product.name,
      price: price ? price : product.price,
      quantity: quantity ? quantity : product.quantity,
    }, {
      where: { id },
    });

    const updatedProduct = await Products.findByPk(id);
    if (categories_ids) {
      console.log(categories_ids);
      await updatedProduct.setCategories(categories_ids);
    }

    product = await Products.findByPk(updatedProduct.id, {
      attributes: ['id', 'name', 'price', 'quantity'],
      include,
    });
    return res.status(200).json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'Product not found'
      });
    }
    await Products.destroy({
      where: {id}
    });

    return res.sendStatus(204);
  }
}

export default new ProductController();