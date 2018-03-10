module.exports = {
    Query: {
        whoAmI(parent, args, context, info) {
            return null;
        },
        getRoom(parent, args, context, info) {
            return context.room.getRoom();
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            let user = context.room.User.createUser();
            context.pubsub.publish('newState', context.room.getRoom());
            return user;
        },
        updateUser(parent, args, context, info) {
            let user = context.room.User.updateUser(args.id, args.color);
            context.pubsub.publish('newState', context.room.getRoom());
            return user;
        },
        createChat(parent, args, context, info) {
            let chat = context.room.User.updateUser(args.id, args.text);
            context.pubsub.publish('newState', context.room.getRoom());
            return chat;
        }
    },
    Subscription: {
      newState: {
        subscribe: (parent, args, context, info) => {
          return pubsub.asyncIterator('newState');
        }
      }
    }
  }