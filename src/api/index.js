import { mutations } from './mutations';
import { query } from './query';
export * from './client';

const api = {
  ...query,
  ...mutations,
};

export default api;
