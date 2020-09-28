const { ApolloServer } = require('apollo-server-express');
const { buildFederatedSchema } = require("@apollo/federation");
const { mergeTypeDefs, mergeResolvers, loadFilesSync } = require('graphql-tools');
const path = require('path');
const { ExtendableError } = require('./errorProvider');
const voyagerMiddleware = require('graphql-voyager/middleware');
const logger = require('../config/winston');
const resolvers = loadFilesSync(path.join(__dirname, '../**/*resolvers.js'));
const types = loadFilesSync(path.join(__dirname, '../**/*typedefs.js'));

module.exports = async (app) => {

  const server = new ApolloServer({
    tracing: true,
    schema: buildFederatedSchema([
      {
        typeDefs: mergeTypeDefs(types),
        resolvers: mergeResolvers(resolvers)
      }
    ]),
    debug: true,
    context: ({ req, res }) => {
      let authScope = null;
      return {
        authScope: authScope,
        req: req,
        res: res
      };
    },
    playground: {
      endpoint: 'http://localhost:4040/graphql',
      settings: {
        'request.credentials': 'same-origin',
        'schema.polling.enable': false
      }
    },
    formatError: (err) => {
      const message = err.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');

      logger.log({
        level: 'error',
        message: err
      });

      if (err.originalError instanceof ExtendableError) {
        return ({
          message: message,
          code: err.originalError.errorCode
        })
      }
      return {
        ...err,
        message,
      };
    }
  });

  server.applyMiddleware({
    app, cors: {
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true)
      }
    }
  });
  app.use('/voyager', voyagerMiddleware.express({ endpointUrl: '/graphql' }));
}
