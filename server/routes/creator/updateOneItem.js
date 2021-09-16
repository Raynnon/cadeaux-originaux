const updateOneItem = async (req, model) => {
  const toUpdate = {
    ...req.body
  };

  const toUpdateNotNull = (obj) => {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  };

  await model.findOneAndUpdate(
    { _id: req.params.id },
    toUpdateNotNull(toUpdate)
  );
};

module.exports = updateOneItem;
