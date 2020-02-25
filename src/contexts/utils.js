const handleNoData = msg => () => {
  throw new Error(msg);
};

export const getNoContextHandler = (msg = 'No context provider found') =>
  new Proxy(
    {},
    {
      get: handleNoData(msg),
      apply: handleNoData(msg),
    }
  );
