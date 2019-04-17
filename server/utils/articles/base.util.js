class baseUtils {
  static isString(value) {
    if (typeof value !== 'string') return false;
    return true;
  }

  static isLength(value, min) {
    if (String(value).replace(/ /g, '').length <= min) {
      return false;
    }
    return true;
  }

  static isStringArray(arr) {
    if (!Array.isArray(arr)) {
      return false;
    }
    const errorState = { notAString: false, emptyString: false };
    arr.forEach((value) => {
      if (typeof value !== 'string') {
        errorState.notAString = true;
      }
      if (String(value).trim().length < 1) {
        errorState.emptyString = true;
      }
    });
    if (errorState.notAString) {
      return false;
    }
    if (errorState.emptyString) {
      return false;
    }
    return true;
  }

  static isBoolean(value) {
    if (typeof value !== 'boolean' && value !== true && value !== false && value !== 'true' && value !== 'false') return false;
    return true;
  }

  static isEmptyObject(value) {
    if (Object.getOwnPropertyNames(value).length === 0) {
      return true;
    }
    return false;
  }
}
export default baseUtils;
