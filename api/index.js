const { ApolloServer, gql } = require("apollo-server");
const { MongoClient } = require('mongodb');

const startAPI = async () => {
  const MONGO_URL = 'mongodb://db:27017';
  const db = (await MongoClient.connect(MONGO_URL)).db('tag-manager');
  const Categories = db.collection('categories');

  const typeDefs = gql`
  type Category {
    name: String
    tags: [String]
  }

  type Query {
    categories: [Category]
    category(name: String): Category
  }

  type Mutation {
    createCategory(name: String, tags: [String]): Category
    createTag(tag: String, categoryName: String): Category
    removeCategory(name: String): Boolean
    removeTag(tag: String, categoryName: String): Category
  }
`;

  const resolvers = {
    Query: {
      category: async (parent, args, context, info) => {
        return await Categories.findOne({ name: args.name });
      },
      categories: async (parent, args, context, info) => {
        return await Categories.find({}).toArray();
      }
    },
    Mutation: {
      createCategory: async (parent, args) => {
        const fields = Object.assign({}, {tags: []}, args);
        await Categories.update({ name: args.name }, { $setOnInsert: fields }, { upsert: true });
        return await Categories.findOne({ name: args.name });
      },
      createTag: async (parent, args) => {
        await Categories.update({ name: args.categoryName }, { $addToSet: { tags: args.tag }}, { upsert: true });
        return await Categories.findOne({ name: args.categoryName });
      },
      removeCategory: async (parent, args) => {
        await Categories.remove({ name: args.name });
        return await Categories.findOne({ name: args.name }) === null;
      },
      removeTag: async (parent, args) => {
        await Categories.update({ name: args.categoryName }, { $pull: { tags: args.tag }});
        return await Categories.findOne({ name: args.categoryName });
      }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startAPI();
