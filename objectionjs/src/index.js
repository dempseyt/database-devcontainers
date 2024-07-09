const { Model } = require("objection");
const Knex = require("knex");

const knex = Knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "example.db",
  },
});

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("users")) {
    return;
  }

  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("firstName");
    table.string("lastName");
  });
}

async function main() {
  const john = await User.query().insertGraph({
    firstName: "John",
    lastName: "Doe",
  });

  console.log("created:", john);

  const johns = await User.query().where("firstName", "John");

  console.log("johns:", johns);
}

createSchema()
  .then(() => main())
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });
