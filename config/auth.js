module.exports = {

    'facebookAuth' : {
        'clientID'      : '1681562368822041', // PT DEV Facebook ID
        'clientSecret'  : '0858658af1b63a30834867217f52fd1c', // PT DEV key
        'callbackURL'   : 'http://localhost:' + process.env.PT_PORT + '/auth/facebook/callback'
    },

//    'twitterAuth' : {
//        'consumerKey'       : 'your-consumer-key-here',
//        'consumerSecret'    : 'your-client-secret-here',
//        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
//    },

//    'googleAuth' : {
//        'clientID'      : 'your-secret-clientID-here',
//        'clientSecret'  : 'your-client-secret-here',
//        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
//    }
};
