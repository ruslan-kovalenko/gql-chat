import { getApiClient } from '.';
import omitDeep from 'omit-deep';

export const baseMutation = (mutation, defaultOptions = {}) => async ({
  omitTypename = true,
  ...options
} = {}) => {
  const res = await getApiClient().mutate({ mutation, ...defaultOptions, ...options });
  omitTypename && omitDeep(res, '__typename');
  return res;
};

export const baseQuery = (query, defaultOptions = {}) => async ({
  omitTypename = true,
  ...options
} = {}) => {
  const res = await getApiClient().query({ query, ...defaultOptions, ...options });
  omitTypename && omitDeep(res, '__typename');
  return res;
};

export const baseNoCacheQuery = query =>
  baseQuery(query, { fetchPolicy: 'network-only' });
