const { TeamsActivityHandler} = require("botbuilder");

class TeamsBot extends TeamsActivityHandler {
  constructor() {
    super();
    this.onMessage(async (context, next) => {

      console.log("Running with Message Activity.");
      await filterNonInclusiveWords(context);
      await next();
    });
  }
}

async function filterNonInclusiveWords(context){

  var dictionary = 
  {
    guys: "folks",
    crazy: "unthinkable",
    slave: "follower",
    insane: "irrational",
    guyz: "folks",
    guyss: "folks",
    chwd: "cisgender, heterosexual white man",
    urp: "members of traditionally underrepresented groups",
    urm: "members of traditionally underrepresented groups",
    urg: "members of traditionally underrepresented groups",
    midget: "little person",
    pimp: "promoter",
    bitching: "complaining",
    bitched: "complained",
    bitch: "whining",
    ghetto: "improvised",
    monguys: "moneveryone",
    sexy: "zesty",
    blacklist : "block list",
    whitelist : "allow list",
    "got balls" : "courage or grit",
    "has balls" : "courage or grit",
    "takes balls" : "courage or grit",
    "off the reservation" : "outside of norms",
    "mon-guys	" : "mon-team",
    "sack up" : "toughen up"
  };

  let message = context.activity.text.toLowerCase().replace(/\n|\r/g, "").trim();
  let txt='Above message can be made more inclusive! Try using ';
  var flag=0;
  
  for (var word in dictionary)
  {
    if(message.indexOf(word)>=0)
    {
      flag=1;
      txt = txt.concat(dictionary[word], " (instead of ", word, ") | ");
    }
  }

  if(flag==1)
  {
    await context.sendActivity(txt);
  }
  
  return;
}

module.exports.TeamsBot = TeamsBot;
