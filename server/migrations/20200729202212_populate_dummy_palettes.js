exports.up = function (knex) {
  return knex("palettes").insert([
    {
      color0: "255,0,0",
      color1: "0,0,0",
      color2: "255,0,0",
      color3: "0,0,0",
      color4: "255,0,0",
    },
    {
      color0: "255,0,0",
      color1: "0,0,0",
      color2: "255,0,0",
      color3: "0,0,0",
      color4: "255,0,0",
    },
  ]);
};

exports.down = function (knex) {
  return knex("palettes").delete();
};
