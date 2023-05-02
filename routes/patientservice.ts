import express from 'express';
const router = express.Router();

interface patientInformation{
    firstName: string,
    lName: string,
    dob: string,
}

let patientMap = new Map<Number, patientInformation>();
let idx = 0;
const createPatient = (fName: string, lName: string, dob: string) => {
    let newPatient: patientInformation = {
        firstName: fName,
        lName: lName,
        dob: dob
    }
    idx = idx + 1;
    patientMap.set(idx, newPatient);

    return idx;
}

const getPatient = (idx: number) => {
    const patient = patientMap.get(idx);
    if(patient == undefined){
        return null;
    }
    return patient;
}


//insert firstname/last name DOB
//get patient
router.post('', async(req, res) => {
    const promptInfo = req.body;
    const firstname = promptInfo.firstname;
    const lastname = promptInfo.lastname;
    const dob = promptInfo.dob
    const patientId = createPatient(firstname, lastname, dob);
    try{

        res.status(200).send(`${patientId}`);

    }catch(e){
        console.log("Sanity Check :D");
        console.log(e);
        res.status(400).send("Something went wrong");
    }

});
// owner: userName,
// zipcode: zipCode,
// address: address,
// type: type,

router.get('', async(req, res) => {
    const reqHeaders =req.headers;
    console.log(reqHeaders.authorization)
    const promptInfo = req.body;
    const patientIdx = req.body.id;
    try{
        // Define your query with parameters
          // Create a new request object
          if(reqHeaders.authorization.User == "Doctor"){
            const patientInfo = getPatient( Number(req.body.id));
            const patientInfoResponse =patientInfo;
            res.status(200).json(patientInfoResponse);
          }
        if(patientIdx != reqHeaders.authorization){
        res.status(401).send('Unauthorized to get this user');
        return;
        }
        const patientInfo = getPatient( Number(req.body.id));
        const patientInfoResponse =patientInfo;
        if(patientInfo){
            res.status(200).json(patientInfoResponse);
        }else{
            res.status(404).send('No Patient was found');
        }
        
    }catch(e){
        console.log(e);
        res.status(404).send("Some error occured");
    }

});
router.get('patientAuth', async(req, res) => {
    const promptInfo = req.body;
    const patientIdx = req.body.id;
    const patientInfo = getPatient(Number(req.body.id));
    const patientInfoResponse =patientInfo;
    try{
        // Define your query with parameters
          // Create a new request object
          if(patientInfo){
            res.status(200).json(patientInfoResponse);
          }else{
            res.status(404).send('No Patient was found');
          }
          
    }catch(e){
        console.log(e);
        res.status(404).json(patientInfoResponse);
    }

});

export default router;