'use strict';

const path = require('path');
const fs = require('fs');
const os = require('os');
const lsbRelease = require('lsb-release');

const utils = require('./utils');
const filter = require('./filter');

class Appl {

  //
  configure() {
    return new Promise( (resolve, reject) => {
      lsbRelease( (_, data) => {
        let info = (data) ? data : {};
        info.os = os.type();
        info.platform = os.platform();
        info.version = os.release();
        //
        this.logger.trace(utils.prefix(this, 'configure'), 'filter info:', info);
        resolve(filter.create(this.logger, info));
      });
    });
  }


}

module.exports.create = (logger, home) => {
  return new Appl(logger, home);
}
