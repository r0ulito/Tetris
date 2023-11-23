/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import test from "ava";
import request from "supertest";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcrypt";
import app from "../server.js";
import { pool } from "../database.js";

// Importation de la configuration
const rawConfig = fs.readFileSync(new URL("../config.json", import.meta.url));
const config = JSON.parse(rawConfig);

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach((t) => {
  t.context.sandbox.restore();
});

test.serial(
  "POST / signup devrait enregistrer un nouvel utilisateur avec succès",
  async (t) => {
    const { sandbox } = t.context;
    sandbox
      .stub(pool, "query")
      .onFirstCall()
      .resolves({ rows: [], rowCount: 0 })
      .onSecondCall()
      .resolves({
        rows: [],
        rowCount: 1,
      });

    const res = await request(app.callback()).post("/signup").send({
      username: "newuser",
      password: "password123",
      email: "newuser@example.com",
    });

    t.is(res.statusCode, 200);
    t.deepEqual(res.body, { message: "Inscription réussie" });
  },
);

test.serial(
  "POST /signup devrait échouer si le username et le mail existe déjà",
  async (t) => {
    const { sandbox } = t.context;
    sandbox.stub(pool, "query").resolves({
      rows: [
        { user_name: "existinguser", user_email: "existinguser@example.com" },
      ],
      rowCount: 1,
    });

    const res = await request(app.callback()).post("/signup").send({
      username: "existinguser", // Doit correspondre à l'utilisateur mocké
      password: "password123",
      email: "existinguser@example.com", // Doit correspondre à l'utilisateur mocké
    });

    t.is(res.statusCode, 400);
    t.deepEqual(res.body, {
      message: "Erreur : Nom d'utilisateur déjà utilisé. E-mail déjà utilisé.",
    });
  },
);

test.serial(
  "POST /signup devrait échouer si le username existe déjà",
  async (t) => {
    const { sandbox } = t.context;
    sandbox.stub(pool, "query").resolves({
      rows: [{ user_name: "existinguser", user_email: "user@example.com" }],
      rowCount: 1,
    });

    const res = await request(app.callback()).post("/signup").send({
      username: "existinguser", // Doit correspondre à l'utilisateur mocké
      password: "password123",
      email: "existinguser@example.com", // Doit correspondre à l'utilisateur mocké
    });

    t.is(res.statusCode, 400);
    t.deepEqual(res.body, {
      message: "Erreur : Nom d'utilisateur déjà utilisé. ",
    });
  },
);

test.serial(
  "POST /signup devrait échouer si le mail existe déjà",
  async (t) => {
    const { sandbox } = t.context;
    sandbox.stub(pool, "query").resolves({
      rows: [{ user_name: "user", user_email: "existinguser@example.com" }],
      rowCount: 1,
    });

    const res = await request(app.callback()).post("/signup").send({
      username: "existinguser", // Doit correspondre à l'utilisateur mocké
      password: "password123",
      email: "existinguser@example.com", // Doit correspondre à l'utilisateur mocké
    });

    t.is(res.statusCode, 400);
    t.deepEqual(res.body, {
      message: "Erreur : E-mail déjà utilisé.",
    });
  },
);

test.serial(
  "POST /login devrait connecter un utilisateur existant avec succès",
  async (t) => {
    const { sandbox } = t.context;
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Simule un utilisateur existant dans la base de données
    sandbox.stub(pool, "query").resolves({
      rows: [{ user_id: "someUserId", hashed_password: hashedPassword }],
      rowCount: 1,
    });

    const res = await request(app.callback()).post("/login").send({
      email: "existinguser@example.com",
      password: "password123",
    });

    t.is(res.statusCode, 200);
    t.truthy(res.body.token); // Vérifie si le token JWT est présent
  },
);

test.serial(
  "GET /userinfo devrait renvoyer des informations sur l'utilisateur",
  async (t) => {
    const { sandbox } = t.context;
    const userId = "someUserId";

    // Simule une réponse de la base de données pour l'utilisateur
    sandbox
      .stub(pool, "query")
      .withArgs("SELECT * FROM users WHERE user_id = $1", [userId])
      .resolves({
        rows: [
          {
            user_id: userId,
            user_name: "existinguser",
            user_email: "existinguser@example.com",
            hashed_password: "hashedPassword",
          },
        ],
        rowCount: 1,
      });

    // Utilisation de la bibliothèque jwt pour créer un token
    const token = jwt.sign({ id: userId }, config.jwt_secret, {
      expiresIn: "2h",
    });

    const res = await request(app.callback())
      .get("/userinfo")
      .set("Authorization", `Bearer ${token}`);

    t.is(res.statusCode, 200);
    t.is(res.body.username, "existinguser");
    t.is(res.body.email, "existinguser@example.com");
  },
);
