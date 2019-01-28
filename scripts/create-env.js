const fs = require('fs')
fs.writeFileSync('./.env', `ACCESS_TOKEN=${process.env.ACCESS_TOKEN}\n`)
