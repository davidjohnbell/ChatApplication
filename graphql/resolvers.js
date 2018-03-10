module.exports = {
    Query: {
        whoAmI(parent, args, context, info) {
            return null;
        },
        getRoom(parent, args, context, info) {
            return null;
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            return null;
        },
        updateUser(parent, args, context, info) {
            return null;
        },
        createChat(parent, args, context, info) {
            return null;
        }
    },
    Subscription: {
      newChat: {
        subscribe: (parent, args, context, info) => {
          let pubsub = context.pubsub;
          return pubsub.asyncIterator(args.streamId);
        }
      },
      newUser: {
        subscribe: (parent, args, context, info) => {
          let pubsub = context.pubsub;
          return pubsub.asyncIterator(args.streamId);
        }
      }
    }
  }