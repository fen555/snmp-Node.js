var express = require('express')
var app = express()
var snmp = require('snmp-native')
var host = '10.1.160.1' // fitmwifi
// 10.4.15.1
// 10.12.160.1
// 172.23.176.1
var community = 'public'
var session = new snmp.Session({ host: host, community: community })
var oid = [1, 3, 6, 1, 2, 1, 1]
var Name
var vb = []
// console.log(Name)
Name = session.getSubtree({ oid: oid }, function (err, varbinds) {
  // vb = varbinds[0]
  console.log(varbinds)
  vb.push({
    name: varbinds[0].value,
    uptime: varbinds[2].value
  })
  // console.log(vb[0].name)
  session.close()
})

// ///////////////////////////////////////////////////////////////
app.get('/name', function (req, res) {
  res.send(vb)
})

app.use(express.static('public'))
app.listen(7001, function () {
  console.log('Example app listening on port 7001!')
})
