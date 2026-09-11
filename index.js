//--------------------setup-----------------------------------------------------------
const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});
//-------------------------help------------------------------------------------------
app.command("/pb-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/pb-ping - Check bot latency
/pb-pokemonfact - Get a random Pokémon fact!
/pb-berrydeets - Get deets on a berry!`
  });
});
/*----------------------------------pokemon fact---------------------------------------------
app.command("/pb-pokemonfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("eeeeeeeeeeeeeeeeee");

  } catch (err) {
    await respond({ text: "Failed to fetch a Pokémon fact." });
  }
});
*/
//--------------------------------list berries------------------------------------------------
//pending
//-----------------------------berry facts--------------------------------------------------
app.command("/pb-berrydeets", async ({ command, ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/berry/${command.text}/`);
    await respond({text:`The ${response.data.name} berry has a size of ${response.data.size} millimeters and a growth time of ${response.data.growth_time} hours.`});

  } catch (err) {
    await respond({ text: "Failed to fetch a Berry fact. Maybe your berry spelling is wrong?" });
  }
});
//-------------------------ping------------------------------------------------------
app.command("/pb-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
//---------------------startup  ----------------------------------------------------------
(async () => {
  await app.start();
  console.log("bot is running!");
})();
