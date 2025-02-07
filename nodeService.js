var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'bater ponto',
  description: 'cron job para bater ponto',
  script: 'C:\Users\Thiago_Rodrigues\workspace\cronus\out\src\schedule.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();