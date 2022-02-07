const tz = require('./tzFullString.json')

const fs = require('fs')

let tzobj = {}
for(let i=0; i<tz.length; i++) {
  const e = tz[i]

  e.timezone = e.timezone.replace(/-/gi, '')

  if(e.timezone.split('/').length === 1){
    tzobj[e.timezone]= e.timezone
  } else if(e.timezone.split('/').length === 2) {
    let timezone = e.timezone.split('/')
    if(!tzobj[timezone[0]]) tzobj[timezone[0]] = {}
    tzobj[timezone[0]][timezone[1]] = e.timezone
  } else if(e.timezone.split('/').length === 3) {
    let timezone = e.timezone.split('/')
    if(!tzobj[timezone[0]]) tzobj[timezone[0]] = {}
    if(!tzobj[timezone[0]][timezone[1]]) tzobj[timezone[0]][timezone[1]] = []
    tzobj[timezone[0]][timezone[1]][timezone[2]] = e.timezone
  }
}
fs.writeFileSync('tz.json', JSON.stringify(tzobj))