const uploadFile = require("../middlewares/uploadFile");
const addItem = require("./crud/addItem");
const deleteItem = require("./crud/deleteItem");

module.exports = {
  crud(router, name, model, controller) {
    /* READ */
    router.get(`/${name}`, async (req, res) => {
      try {
        res.send(await controller.read(model, req.query));
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
        res.send(await controller.updateOne(req, model));

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
