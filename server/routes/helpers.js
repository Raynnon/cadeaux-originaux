const uploadFile = require("../middlewares/uploadFile");
const readAllItems = require("./crud/readAllItems");
const addItem = require("./crud/addItem");
const deleteItem = require("./crud/deleteItem");
const readOneItem = require("./crud/readOneItem");
const updateOneItem = require("./crud/updateOneItem");

module.exports = {
  crud(router, name, model) {
    /* READ PRODUCTS */
    router.get(`/${name}`, async (req, res) => {
      try {
        res.send(await readAllItems(model));
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    });

    /* READ BY ID */
    router.get(`/${name}/:id`, async (req, res) => {
      try {
        const data = await readOneItem(req.params.id, model);

        res.send(data);
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    });

    /* ADD  */
    router.post(`/${name}`, uploadFile(), async (req, res) => {
      try {
        await addItem(req, model, `${name}/`);

        res.send();
      } catch (e) {
        console.log(e);
        res.status(400).send(e);
      }
    });

    // EDIT BY ID
    router.put(`/${name}/:id`, uploadFile(), async (req, res) => {
      try {
        await updateOneItem(req, model);

        res.send();
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    });

    // DELETE
    router.delete(`/${name}/:id`, async (req, res) => {
      try {
        await deleteItem(req.params.id, model);

        res.send();
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    });
  }
};
