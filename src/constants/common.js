import { Time } from '../models';

const host = process.env.API_HOST || 'localhost:5000';
export const API_WS =  `ws://${host}/`;
export const API_URL = `http://${host}/graphql`;

export const TOKEN_UPDATE_DELAY = Time.minutes(50);
export const TOKEN_UPDATE_MINIMUM_TIME = TOKEN_UPDATE_DELAY + Time.minutes(5);
