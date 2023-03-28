const funcall = require("../modules/funcall.js");
//simple ping command to check if the bot is online.
const strifecall = require("../modules/strifecall.js");
exports.type = "strife";
exports.desc = "Passes your turn";
exports.use = `">pass" passes your turn, and depending on game settings, may or may not save your stamina to your next turn.`;
exports.run = (client, message, args) => {
  var charid = client.userMap.get(message.guild.id.concat(message.author.id),"possess");

  if(!client.charcall.charData(client,charid,"strife")){
    message.channel.send("You are not currently in Strife!")
    return;
  }

  let local = client.charcall.charData(client,charid,"local");

  if(strifecall.turnTest(client,message,local)==false){
    message.channel.send("It is not your turn!");
    return;
  }

  message.channel.send("Passing turn...");
  client.tutorcall.progressCheck(client,message,36);
  client.strifecall.pass(client,charid,message,local);
  //setTimeout(client.strifecall.pass,3000,client,message,local);
}
