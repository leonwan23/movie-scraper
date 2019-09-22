import models from "../models";
import { toJs, responseError, responseSuccess } from "../utils";

const Movies = models.movie;

// const create = async function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   const body = req.body;
//   if (!body.refKey) {
//     return responseError(res, "Please enter a mlModel refKey.");
//   } else {
//     let err, mlModel, result;

//     [err, mlModel] = await toJs(MLModels.create(body));

//     if (err) return responseError(res, err, 422);

//     return responseSuccess(
//       res,
//       {
//         message: "Successfully created new mlModel.",
//         mlModel: mlModel.toWeb()
//       },
//       201
//     );
//   }
// };

const findAllFromCathay = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, movies;
  [err, movies] = await toJs(
    Movies.findAll({
      order: [["title", "ASC"]]
    })
  );

  if (err) {
    return responseError(res, err);
  }
  return responseSuccess(res, { movies });
};

// const get = async function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   let err, mlModel;
//   const id = req.params.id;
//   [err, mlModel] = await toJs(MLModels.findOne({ where: { id: id } }));

//   if (err) {
//     return responseError(res, err);
//   }
//   return responseSuccess(res, { mlModel });
// };

// const update = async function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   let err, mlModel, result;
//   const id = req.params.id;
//   mlModel = req.body;

//   [err, mlModel] = await toJs(MLModels.update(mlModel, { where: { id: id } }));
//   if (err) return responseError(res, err);

//   return responseSuccess(res, { message: "OK" });
// };

// const remove = async function(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   let err, mlModel, result;
//   const id = req.params.id;

//   [err, mlModel] = await toJs(MLModels.destroy({ where: { id: id } }));
//   if (err) return responseError(res, "error occured trying to delete mlModel");

//   return responseSuccess(res, { message: "OK" }, 204);
// };

export default {
  //   create,
  findAllFromCathay
  //   get,
  //   update,
  //   remove
};
