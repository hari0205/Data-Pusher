const errorhandler = async (promise: Promise<any>): Promise<any | null> => {
  try {
    const data = await promise;
    console.debug(`Data: ${JSON.stringify(data)}`);
    return [data as any, null];
  } catch (error: unknown) {
    console.error(`Error: ${JSON.stringify(error)}`);
    return [null, error as Error];
  }
};

export default errorhandler;
