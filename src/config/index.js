import packages from './packages';

export default {
    API_URL: 'http://178.160.242.68:3001',
    routes: {
        register: '/register',
        verifyCode: '/verifyCode',
        getSecret: '/getSecret'
    },

    myNumber: '055555555', // hard code, don't have time
    handSecret: '',
    clientSecret: 'secret123!@#',


    inlineCodes: ['91', '99', '96', '41', '43'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    fees: {
        'call': {
            'inline': 5,
            'outline': 20,
            'foreign': 60
        },
        'sms': {
            'inline': 3,
            'outline': 10,
            'foreign': 40
        }
    },
    packages
}