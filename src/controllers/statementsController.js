import { db, objectId } from "../dbStrategy/mongo.js";
import joi from "joi";

export async function getLogs(req, res) {
  const logs = await db
    .collection("statements")
    .find({ userId: new objectId(res.local.session.userId) })
    .toArray();
  res.send(logs);
}

export async function newLog(req, res) {
  const log = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "");

  const logSchema = joi.object({
    description: joi.string().required(),
    value: joi.string().required(),
    date: joi.string().required(),
    type: joi
      .string()
      .required()
      .valid(...["pos", "neg"]),
  });

  const { error } = logSchema.validate(log);

  if (error) {
    return res.sendStatus(422);
  }
  const session = await db.collection("sessions").findOne({ token });

  if(!session) {
    return res.sendStatus(401);
  }
  await db.collection('statements').insertOne({ ...post, userId: session.userId})
}
