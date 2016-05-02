var express = require('express')
var app = express()
var snmp = require('snmp-native')
var speedTest = require('speedtest-net')
var moment = require('moment')
// var host = '10.1.160.1' // fitmwifi
var host = '10.4.15.1' // fitmwifi
// 10.4.15.1
// 10.12.160.1
// 172.23.176.1
var community = 'public'
var session = new snmp.Session({ host: host, community: community })
var session2 = new snmp.Session({ host: host, community: community })
var session3 = new snmp.Session({ host: host, community: community })
var oid1 = [1, 3, 6, 1, 2, 1, 1]
var oid2 = '.1.3.6.1.2.1.4.21.1.1' // ip
var oid3 = '.1.3.6.1.2.1.4.21.1.11' // subnet
var vb = []
var ip = []
var subnet = []
var speed = []

var test = speedTest({maxTime: 2000})
// var test = speedTest()
test.on('data', function (data) {
  speed.push(data)
  console.log(data)
})

test.on('error', function (err) {
  console.error(err)
})

function timestamp (time) {
  return moment(time).fromNow()
}

session.getSubtree({ oid: oid1 }, function (err, varbinds) {
  // vb = varbinds[0]
  var time = varbinds[2].value
  vb.push({
    discription: varbinds[0].value,
    uptime: timestamp(time),
    name: varbinds[4].value
  })
  console.log(time)
  console.log(timestamp(time))
  // console.log(vb[0].name)
  session.close()
})

session2.getSubtree({ oid: oid2 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
    ip.push({
      ip: data.value
    })
  })
  session2.close()
})

session3.getSubtree({ oid: oid3 }, function (err, varbinds) {
  varbinds.forEach(function (data) {
    // console.log(data.value)
    subnet.push({
      subnet: data.value
    })
  })
  session3.close()
})

// ///////////////////////////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})
app.get('/ip', function (req, res) {
  res.send(ip)
})
app.get('/subnet', function (req, res) {
  res.send(subnet)
})
app.get('/speed', function (req, res) {
  res.send(speed)
})

app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
