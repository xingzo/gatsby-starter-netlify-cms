const fs = require('fs')

fs.writeFileSync('./.env.local', `ACCESS_TOKEN=${process.env.ACCESS_TOKEN}\n`)
