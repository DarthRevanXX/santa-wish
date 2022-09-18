const express = require('express');
const router = express.Router();
const util = require('../util/index');
const userService = require('../service/user-service');
const { wishLength, wishAge } = require('../constant/index');

router.post('/santa-wish', async (req, res) => {
  const username = req.body.userid;
  const userWish = req.body.wish;

  if (username === undefined || userWish === undefined) {
    console.info('userid or wish is not provided');
    return res.render('error', { error: 'Something happend...' });
  }

  if (userWish.length > wishLength) {
    return res.render('error', {
      error: `User wish should be less than ${wishLength}`,
    });
  }

  const userBasicInfo = await userService
    .getUserBasicInfo(username)
    .catch(() => {
      console.error('Error getting user basic info', error);
      return res.render('error', { error: 'Something happend...' });
    });

  if (userBasicInfo === undefined) {
    console.info('User not found');
    return res.render('error', { error: 'User not registered' });
  }

  const userProfile = await userService
    .getUserProfile(userBasicInfo.uid)
    .catch(() => {
      console.error('Error getting user profile info', error);
      return res.render('error', { error: 'Something happend...' });
    });

  if (userProfile === undefined) {
    console.info('User profile not found');
    return res.render('error', { error: 'User not registered' });
  }

  const userAge = util.calcAge(userProfile.birthdate, 'YYYY/DD/MM');

  if (userAge >= wishAge) {
    console.info('User wish is not accepted due age');
    return res.render('error', {
      error: `User age should be less than ${wishAge}`,
    });
  }

  const userResponse = {
    username: userBasicInfo.username,
    address: userProfile.address,
    wish: userWish,
  };
  // Pushing user wish object
  memoryDB.push(userResponse);

  console.info('User wish is accepted');
  res.render('success');
});

router.get('/santa-wish', (req, res) => {
  res.render('main');
});

module.exports = router;
