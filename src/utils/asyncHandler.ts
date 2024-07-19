const errorhandler = async (promise: Promise<any>): Promise<any | null> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default errorhandler;
