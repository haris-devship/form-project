let database = require("../../models/mongodb.js");

//Get Document
const GetDocument = (collection, query, projection) => {
  return new Promise((resolve, reject) => {
    let qry = database[collection].find(query, projection);
    qry.exec((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Insert Document
const InsertDocument = (collection, docs) => {
  return new Promise((resolve, reject) => {
    let query = database[collection](docs);
    // query.save((err, result) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(result);
    //   }
    // });
    query.save((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//Update on Document
const UpdateDocument = (collection, query, params, options) => {
  return new Promise((resolve, reject) => [
    database[collection].updateOne(query, params, options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }),
  ]);
};

//Delete One Document
const DeleteOneDocument = (collection, query) => {
  return new Promise((resolve, reject) => {
    database[collection].deleteOne(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  InsertDocument: InsertDocument,
  GetDocument: GetDocument,
  UpdateDocument: UpdateDocument,
  DeleteOneDocument: DeleteOneDocument,
};
