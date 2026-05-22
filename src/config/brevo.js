import { BrevoClient } from "@getbrevo/brevo";
import { env } from './env.js';

async function main() {
    const client = new BrevoClient({
        apiKey: env.brevo.api_key
    });
    await client.account.getAccount();
}
main();



// {
//   "organization_id": "6a0f3ef7c3b65d60560e9384",
//   "user_id": 11279929,
//   "enterprise": false,
//   "relay": {
//     "enabled": true,
//     "data": {
//       "userName": "ac1e39001@smtp-brevo.com",
//       "relay": "smtp-relay.brevo.com",
//       "port": 587
//     }
//   },
//   "email": "wallmapumesana@gmail.com",
//   "firstName": "Wallmapu",
//   "lastName": "Mesana",
//   "companyName": "Biblioteca Wallmapu de Mesana",
//   "address": {
//     "city": "Valparaíso",
//     "street": "Mesana 65",
//     "zipCode": "2340000",
//     "country": "Chile"
//   },
//   "dateTimePreferences": {
//     "timezone": "America/Santiago",
//     "timeFormat": "24",
//     "dateFormat": "dd-mm-yyyy"
//   },
//   "language": "es",
//   "plan": [
//     {
//       "type": "free",
//       "credits": 300,
//       "creditsType": "sendLimit"
//     },
//     {
//       "type": "sms",
//       "credits": 0,
//       "creditsType": "sendLimit"
//     }
//   ],
//   "planVerticals": [
//     {
//       "planCategory": "Marketing",
//       "planType": "free",
//       "name": "Free",
//       "status": "active",
//       "startDate": "1779384062",
//       "endDate": "1782062462",
//       "users": {
//         "purchasedSeats": "1",
//         "usedSeats": "1"
//       }
//     }
//   ]
// }