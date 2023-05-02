import express from 'express';
import patient from './routes/patientservice';

const app = express();
const port = 8000;
require('dotenv').config();
app.use(express.json());
app.use(               
  express.urlencoded({
    extended: true,
  })
);
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send("Hello World"));
app.get('/hiomer', (req, res) => res.send("Hello World Omer"));
//app.use('/getfeedinfo', openAiRoutes);
app.use('/patient', patient);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
