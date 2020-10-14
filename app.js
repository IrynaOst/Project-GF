const axios = require('axios');

require('dotenv').config();

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);

setInterval(() => 
    (async () => {
        const config = {
            method: 'post',
            url: 'https://my.greenforest.com.ua/profile/get_student_group_schedules_to_change',
            headers: {
                cookie: '{YOUR_COOKIE}',
            },
            data: "group_id={YOUR_GROUP_ID}"
        };
        let result = await axios(config);

        let obj = result.data.groups['22'];
        let neededTime = 'Вт., Чт.: 09:10';

        for(let schedule of obj) {
            if (schedule.schedule === neededTime) {

                client.messages.create({
                    to: '+380{YOUR_NUMBER}', // You send a message to this number
                    from: '+{YOUR_TWILIO_NUMBER}', // Your twilio number
                    body: `Your group ${neededTime} is available`
                });
                console.log('The sms has been sent.')
            } 
        }
    })()
, 60000);
