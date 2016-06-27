// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '883191021763843', // your App ID
        'clientSecret'    : '0310c2f8ad0421767a2c93b87744d2f1', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

};
