const { PostsServer }  = require('./server/posts_server');

PostsServer.details(101).then(data => {
    console.log(data);
})
