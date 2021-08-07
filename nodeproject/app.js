const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express = require('express');
var http = require('http');

const bodyParser = require('body-parser'); 
const cors = require('cors')

const app = express();
const port = process.env.port ||3000;
const msg1 = 'hi'

app.use(cors());
var corsOptions = {
  origin: function (origin, callback) {
    if (1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// app.use(function (req, res, next) {//

//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
  
//     //Pass to next layer of middleware
//     next();
//   });

//   app.use(bodyParser.urlencoded({ extended: true }));  
//   app.use(bodyParser.json());
//  app.post('/', (req, res) =>{                           
//     console.log(req.body);                              
//  });

//   app.route('/send',(req, res) =>{                           
//     console.log(req.body);                              
//  })
 //const bodyParser = require('body-parser');           
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
//  app.route('/token', (req, res) =>{                         
//     console.log(req.body);                            
//  });

 app.post('/', cors(corsOptions), (req, res1) =>{                         
  //console.log(req.body.msg);
 // res.send(Object.values())
  runSample(req.body.msg).then(res=>
    {
      console.log(res)
     // res.on(res)
      res1.send({res:res});
    })                            
});
app.get('/', (req, res1) =>{                         
  //console.log(req.body.msg);
  res1.send("Hii")
                           
});
  //   app.post('/sendmsg',(req,res,next)=>
  //   {
  //     req.body
  //     console.log(req.body)
   
  //  res.send("req.body1")
  //       runSample(req.body.msg).then(data=>
  //   {
  //       res.send({data})
  //   })
  //    })

   
/**
 * 

 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'dypchatbot') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(
      {
          keyFilename:"./dypchatbot.json"
      });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
   return result.fulfillmentText;
}
app.listen(port,()=>
{
    console.log(port)
})
//runSample()
