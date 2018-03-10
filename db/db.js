function User() {
    this.users = [];
    this.createUser = function() {
        let _user = {
            id: Math.random().toString(36).substring(2, 15),
            name: Math.random().toString(36).substring(2, 15),
            color: 'black'
        };
        this.users.push(_user);
        return _user;
    }
    this.updateUser = function(id, name, color) {
        let _user = this.users.find(u => u.id === id);
        _user.name = name;
        _user.color = color;
        return _user;
    }
}

function Chat() {
    this.chats = [];
    this.createChat = function(id, text) {
        let _chat = {
            user: id,
            message: text,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
        this.chats.push(_chat);
        return _chat;
    }
}

function Room() {
    this.Chat = new Chat();
    this.User = new User();
    this.getRoom = function() {
        return {
            users: this.User.users,
            chats: this.Chat.chats.slice(0, 200)
        };
    }
}

module.exports = new Room();