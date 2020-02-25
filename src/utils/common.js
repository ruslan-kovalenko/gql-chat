import decodeJwt from 'jwt-decode';
import { TOKEN_UPDATE_MINIMUM_TIME } from '../constants';
import { Time } from '../models';
import moment from 'moment';

export const actionPath = prefix => type => `${prefix}/${type}`;

export const shouldUpdateToken = token => {
  const decoded = decodeJwt(token);
  const now = new Date().getTime();
  const expirationTime = Time.seconds(decoded.exp);
  const diff = expirationTime - now;
  return diff < TOKEN_UPDATE_MINIMUM_TIME;
};

export const toMoment = val => {
  const parsed = moment(val);
  return parsed.isValid() ? parsed : val;
};
