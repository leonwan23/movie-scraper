// import server from './server';

// server.start().then(app => {
//     console.log(
//         `Server started succesfully, running on port: ${app.address().port}.`
//       );
// })
import { cathayScraper } from "./controllers/scraper";

cathayScraper().then(res => console.log(res));
