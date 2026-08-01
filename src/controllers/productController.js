export const createProdct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const { id, role } = req.user;
    console.log(id, role);
  } catch (error) {
    throw new Error(error.message);
  }
};
