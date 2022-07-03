import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../dbStrategy/mongo.js";
import joi from "joi";

export async function registerUser(req, res) {
  const user = req.body;

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = userSchema.validate(user);

  if (error) {
    return res.sendStatus(422);
  }

  const encryptedPassword = bcrypt.hashSync(user.password, 10);

  await db
    .collection("users")
    .insertOne({ ...user, password: encryptedPassword });
  res.status(201).send("Usuário criado com sucesso");
}

export async function loginUser(req, res) {
  const userInfo = req.body;

  const userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = userSchema.validate(userInfo);

  if (error) {
    return res.sendStatus(422);
  }

  const user = await db.collection("users").findOne({ email: userInfo.email });
  if (user && bcrypt.compareSync(userInfo.password, user.password)) {
    const token = uuid();

    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });

    return res.status(201).send({ token });
  } else {
    return res.status(401).send("Senha ou email incorretos!");
  }
}
