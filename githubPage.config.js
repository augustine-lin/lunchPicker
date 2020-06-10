const fs = require('fs')
const { ncp } = require('ncp') // copy
const rimraf = require('rimraf') // rm rf

const fromDir = './build'
const toDir = './docs'
const cname = 'lunch.foodier.site'

const createToDirAndCNAME = () => {
  console.log(`製作 ${toDir}`)
  fs.mkdirSync(toDir)
  console.log('製作 CNAME檔')
  fs.appendFileSync(`${toDir}/CNAME`, cname)
}

if (!fs.existsSync(toDir)) {
  createToDirAndCNAME()
} else {
  console.log(`移除 ${toDir}`)
  rimraf.sync(toDir)
  createToDirAndCNAME()
}

ncp(fromDir, toDir, (err) => {
  console.log(`將 ${fromDir} 複製到 ${toDir}`)
  if (err) {
    return console.error(err)
  }
  console.log('完成!')
  return true
})
