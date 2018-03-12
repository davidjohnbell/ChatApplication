module.exports = {
    Query: {
        whoAmI(parent, args, context, info) {
            //let session = context.session;
            //session.user = session.isNew ? context.room.User.createUser() : session.user;
            return context.room.User.createUser();
        },
        getRoom(parent, args, context, info) {
            return context.room.getRoom();
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            let user = context.room.User.createUser();
            let room = context.room.getRoom();
            context.pubsub.publish('newState', {newState:room});
            return user;
        },
        updateUser(parent, args, context, info) {
            let user = context.room.User.updateUser(args.id, args.name, args.color);
            let room = context.room.getRoom();
            context.pubsub.publish('newState', {newState:room});
            return user;
        },
        createChat(parent, args, context, info) {
            let chat = context.room.Chat.createChat(args.id, args.text);
            let room = context.room.getRoom();
            context.pubsub.publish('newState', {newState:room});
            return chat;
        }
    },
    Subscription: {
      newState: {
        subscribe: (parent, args, context, info) => {
          return context.pubsub.asyncIterator('newState');
        }
      }
    }
  }