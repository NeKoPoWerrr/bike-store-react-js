class CustomError extends Error {
  constructor(options) {
    super(options?.data?.message);
    this.isCustom = true;
    
    const { code, message, type, title } = options || {};
    this.data = {
      code, message, type, title
    };
  }
}

export default CustomError;