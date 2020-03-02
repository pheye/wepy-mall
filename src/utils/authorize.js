import wepy from 'wepy';
import moment from 'moment';
import {
  SYSTEM_INFO,
  USER_INFO,
  TOKEN,
  TOKEN_EXPIRED,
  ME,
  AUTHORIZE_URL,
} from '@/utils/constant';

function isLogined () {
  let token = wepy.getStorageSync(TOKEN);
  let tokenExpired = wepy.getStorageSync(TOKEN_EXPIRED);
  let me = wepy.getStorageSync(ME);
  if (!token || !tokenExpired || moment().isAfter(tokenExpired) || !me) {
    return false;
  }
  return true;
}

function ensureAuthorized () {
  if (isLogined()) {
    return true;
  }
  let url =  wepy.getStorageSync(AUTHORIZE_URL) || '/pages/authorize?back=1';
  wx.navigateTo({
      url
  })
  return false;
}

module.exports = {
  isLogined,
  ensureAuthorized
}
