const { default: axios } = require('axios');

const getUserProfile = async (uuid) => {
  const userProfiles = await axios.get(
    'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json'
  );

  const user = userProfiles.data.find(
    (userProfile) => userProfile.userUid === uuid
  );

  if (!user) return undefined;
  return user;
};

const getUserBasicInfo = async (username) => {
  const usersBasicInfo = await axios.get(
    'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json'
  );

  const user = usersBasicInfo.data.find((user) => user.username === username);

  if (!user) return undefined;
  return user;
};

exports.getUserProfile = getUserProfile;
exports.getUserBasicInfo = getUserBasicInfo;
