const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const loggedEvent = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(loggedEvent);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    // Testing save log
    await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt', loggedEvent));
  } catch (err) {
    console.error(err);
  }
};

module.exports = logEvents;