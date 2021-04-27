const { PostsServer } = require('./server/posts_server');
const { UsersServer } = require('./server/users_server');
PostsServer.details(110).then(data => {
});
UsersServer.details(11).then(data => {
    console.log(JSON.stringify(data, null, 2));
})

