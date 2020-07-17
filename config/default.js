module.exports = {
    ssh: {
        host: '172.26.0.131',
        port: '22',
        username: 'ubuntu',
        password: 'abc123!',
    },
    path: {
        localWorkPath: /.*apple1\/project\/(.*)/,
        remoteWorkPath: '/home/ubuntu/project/',
    },
    watcherPath:[
        '/Users/apple1/project/tbl-replatform-api'
    ]
};