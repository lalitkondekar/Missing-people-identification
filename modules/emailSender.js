const {transporter} = require("./nodemailerSetup");
const { missingPerson , FaceData } = require("./mongoSchema");

function informingMsg(person,informedInfo){
    msg = `
    this is to kindly inform you that we found a missing person from your database.
    The person's details are as follows:
    Name: ${person.name}
    Age: ${person.age}
    Gender: ${person.gender}
    Area of incidence: ${person.incidentPlace}
    Registration Date: ${person.registrationDate}
    Police Station: ${person.policeStation}
    District: ${person.district}

    We are informed by:
    Name: ${informedInfo.informerName}
    phone: ${informedInfo.informerPhone}
    location: ${informedInfo.informedLocation}
    `;

    return msg;
}

async function sendMailToPolice(policeEmail,informedInfo){
    const person = await missingPerson.find({_id : informedInfo.informedID});
    console.log(person);

    await transporter.sendMail({
        from: '"Missing People Identification system 👻" <lalit5kondekar@gmail.com>', // sender address
        to: policeEmail, // list of receivers
        subject: `Missing person found: ${person[0].name}`, // Subject line
        text: informingMsg(person[0],informedInfo),
    }); 

}

module.exports = {sendMailToPolice};