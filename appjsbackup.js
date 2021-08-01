const sonicx = require('sonicx');
const clientconfig =  require('./dypchatbot.json');
const goolgeAuth = require('google-oauth-jwt');
const config= {
'private_key': clientconfig.private_key,
'client_email':clientconfig.client_email,    
}
const getToken = async ()=>
{
    return new Promise((resolve)=>
    {
        goolgeAuth.authenticate(
            {
                email:clientconfig.client_email,
                key:clientconfig.private_key,
                scope:['https://www.googleapis.com/auth/cloud-platform',
                'https://www.googleapis.com/auth/dialogflow'],
            },(error,token)=>
            {
resolve(token);
            },
        
            );
    });
}
sonicx.route('/token', [
    {
        controller: async (req, res) => {
            let token = await getToken();
            res.send({ token });
        }
    }
]);
sonicx.listen(5000, () => console.log("Listening on 4000"));