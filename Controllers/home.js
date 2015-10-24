module.exports = {
    index: function*(next)
    {
        this.body = 'Hello World';
    },
    user: function*(next) {
        this.body = 'Hello user';
    }
} 