exports.up = function (knex) {
  return knex.schema.createTable("palettes", function (table) {
    table.increments("id");
    table.string("color0", 255);
    table.string("color1", 255);
    table.string("color2", 255);
    table.string("color3", 255);
    table.string("color4", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("palettes");
};
