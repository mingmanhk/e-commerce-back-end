const router = require("express").Router();
const { Category, Product } = require("../../models");

// GET all locations
router.get("/", async (req, res) => {
  try {
    const CategoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get("/:id", async (req, res) => {
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!CategoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category
router.post("/", async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body);
    console.log(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a category by its `id` value
router.put("/:id", async (req, res) => {
  const CategoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(CategoryData);
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
