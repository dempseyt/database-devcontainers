const Waterline = require("waterline");
const sailsDiskAdapter = require("sails-disk");
const waterline = new Waterline();

const config = {
  adapters: {
    disk: sailsDiskAdapter,
  },

  datastores: {
    default: {
      adapter: "disk",
    },
  },

  default: {
    adapter: "sails-mongo",
    url: "mongodb://root@localhost/test",
  },

  attributes: {
    id: { type: "string", columnName: "_id" },
  },
};

const userCollection = Waterline.Collection.extend({
  identity: "User",
  datastore: "default",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      autoMigrations: { autoIncrement: true },
    },
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
});

waterline.registerModel(userCollection);

waterline.initialize(config, (err, ontology) => {
  if (err) {
    console.error(err);
    return;
  }

  const User = ontology.collections.user;

  (async () => {
    // First we create a user
    const user = await User.create({
      firstName: "Neil",
      lastName: "Armstrong",
    });

    // Then we grab all users and their pets
    const users = await User.find();
    console.log(users);
  })()
    .then(() => {
      // All done.
    })
    .catch((err) => {
      console.error(err);
    }); //_∏_
});
