const moment = require('moment');
const { sendEmail } = require('../service/email-service');

const calcAge = (dateString, format) => {
  return moment().diff(moment(dateString, format), 'years');
};

const sendNotSentEmails = (interval, userWishes) => {
  setInterval(() => {
    console.info('Sending not send emails...');
    for (let index = userWishes.length - 1; index >= 0; index--) {
      try {
        sendEmail({
          from: 'do_not_reply@northpole.com',
          to: 'santa@northpole.com',
          subject: 'Wish that was never send',
          text: `Username: ${userWishes[index].username} \n Address: ${userWishes[index].address} \n Wish: ${userWishes[index].wish}`,
        });
      } catch (error) {
        console.error('Email Error: ' + error);
      }
    }
  }, interval);
};

exports.calcAge = calcAge;
exports.sendNotSentEmails = sendNotSentEmails;
