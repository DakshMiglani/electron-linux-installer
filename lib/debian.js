var deb = require('electron-installer-debian'),
    chalk = require('chalk'),
    error = require('./sendErr'),
    p = require('./path'),
    inq = require('inquirer')

module.exports = (cb) => {
    inq.prompt([{
     name: 'deb',
     type: 'input',
     message: 'Would you like to build for Debian?',
     validate: (v) => {
         if(
            v.length && 
            v.toLowerCase().indexOf('yes') !== -1 ||
            v.toLowerCase().indexOf('y') !== -1 ||
            v.toLowerCase().indexOf('no') !== -1 ||
            v.toLowerCase().indexOf('n') !== -1
         ) {
            return true
         } else {
             return 'Please Enter a yes or a no'
         }
     }   
    }], (a) => {
        let d = a.deb.toLowerCase()
        if(d.indexOf('yes') || d.indexOf('y')) {
            inq.prompt(p).then((a) => {
                let options = {
                    src: a.src,
                    dest: a.dest,
                    arch: a.arch
                }
                console.log(chalk.green('Starting to Build for Debian'))
                deb(options, (err) => {
                    if(err) {
                        error(err)
                    }
                })
                console.log(chalk.green('Build for Both Complete.'))
            })
        } else {
            cb()
        }
    })
}