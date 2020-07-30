const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex")(require("./knexfile"));

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

knex.on("query", ({ sql }) => console.log(sql));

app.get("/greeting", async (_, res) => {
  const [greeting] = await knex("greetings").limit(1);

  res.send(JSON.stringify(greeting));
});

app.get("/palettes", async (_, res) => {
  knex.raw("select * from palettes").then((palettes) => {
    res.send(JSON.stringify(palettes));
  });
});

app.put("/palettes/:id", async (req, res) => {
  try {
    const result = await knex("palettes").where("id", req.params.id).update({
      color0: req.body.color0,
      color1: req.body.color1,
      color2: req.body.color2,
      color3: req.body.color3,
      color4: req.body.color4,
    });
    if (result > 0) {
      res.send(result + " updated");
    } else {
      res.status(404).send("Not found!");
    }
  } catch {
    res.status(500).send("error!");
  }
});

app.delete("/palettes/:id", async (req, res) => {
  try {
    const result = await knex("palettes").where("id", req.params.id).delete();
    if (result > 0) {
      res.send(result + " removed");
    } else {
      res.status(404).send("Not found!");
    }
  } catch {
    res.status(500).send("error!");
  }
});

app.post("/palettes", async (req, res) => {
  await knex("palettes").insert({
    color0: req.body.color0,
    color1: req.body.color1,
    color2: req.body.color2,
    color3: req.body.color3,
    color4: req.body.color4,
  });
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
