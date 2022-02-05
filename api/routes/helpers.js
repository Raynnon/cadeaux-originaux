const uploadFile = require("../middlewares/uploadFile");
const addItem = require("./crud/addItem");
const deleteItem = require("./crud/deleteItem");
const auth = require("../middlewares/authMiddleware");

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

    /* POST  */
    router.post(`/${name}`, auth, uploadFile(), async (req, res) => {
      try {
        await addItem(req, model, `${name}/`);

        res.send();
      } catch (e) {
        console.log(e);
        res.status(400).send(e);
      }
    });

    // EDIT BY ID
    router.put(`/${name}/:id`, auth, uploadFile(), async (req, res) => {
      try {
        res.send(await controller.updateOne(req, model));

        res.send();
      } catch (e) {
        console.log(e);
        res.status(400).send();
      }
    });

    // DELETE
    router.delete(`/${name}/:id`, auth, async (req, res) => {
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
