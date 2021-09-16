const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// get all products
router.get("/", async (req, res) => {
  try {
    const ProductData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["id", "category_name"],
        },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
        },
      ],
    });
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const ProductData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });

    if (!ProductData) {
      res.status(404).json({ message: "No Product found with that id!" });
      return;
    }
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const ProductData = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
    });
    const ProductTagData = await ProductTag.bulkCreate(
      req.body.tag_id.map((id) => {
        return { product_id: ProductData.id, tag_id: id };
      })
    );
    res.status(200).json("Update successfully!");
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    // update product data
    const ProductData = await Product.update(
      {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(
        // drop old product tag
        async function dropproducttag() {
          const ProductTags = await ProductTag.destroy({
            where: {
              product_id: req.params.id,
            },
          });
        }
      )
      .then(
        // create new product tag
        async function createproducttag() {
          // Create new tag
          const ProductTagData = await ProductTag.bulkCreate(
            req.body.tag_id.map((id) => {
              return { product_id: req.params.id, tag_id: id };
            })
          );
        }
      );
    res.json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const ProductData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    }).then(
      // drop old product tag
      async function dropproducttag() {
        const ProductTags = await ProductTag.destroy({
          where: {
            product_id: req.params.id,
          },
        });
      }
    );
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
