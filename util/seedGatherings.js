var moment = require('moment');
module.exports = [
{
    type: 'gathering',
    imageUrl: "http://vignette3.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest?cb=20111216183045",
    title: "Lebowskifest",
    description: "Abiding, bowling, the occasional acid flashback.",
    location: "Bowling Alley",
    dateTime: moment().add(2, 'days').toDate(),
  },
  {
    type: 'gathering',
    imageUrl: "http://25.media.tumblr.com/tumblr_llydmkQML11qaw9gjo1_400.jpg",
    title: "Art hack",
    description: "Art for hacking's sake",
    location: "Enspiral space",
    dateTime: moment().add(1, 'days').toDate(),
    status: 0
  }
]
