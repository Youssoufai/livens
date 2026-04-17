import { AxiosError } from "axios";

const defaultStatus = 400;

export const handleAxiosErrors = (
  error: Error | AxiosError,
): NetworkResponse<undefined> => {
  const axiosErr = error instanceof AxiosError;
  if (axiosErr && error.response) {
    const statusCode = error.status || error.response.status;

    console.log(error.response);

    // 5xx Errors
    if (Math.floor((error.status || error.response.status) / 100) === 5) {
      error.response.data = {
        status: statusCode,
        message: "Our Server is having troubles. Please, try again later",
      };
    } else if (statusCode === 404) {
      error.response.data = {
        status: statusCode,
        message: "Unable to complete your request. Try again later.",
      };
    }

    return { ...error.response.data, status: statusCode };
  } else if (axiosErr && error.request) {
    return {
      error: "Connection Error",
      message: "No internet connection found. Please, check your network.",
      status: defaultStatus,
    };
  } else {
    return {
      error: "Unexpected Error",
      message: error.message,
      status: defaultStatus,
    };
  }
};

export const catchErr = (
  fallbackError: unknown,
  fallbackMessage: string | undefined = "An error occured",
) => {
  if (fallbackError instanceof Error || fallbackError instanceof AxiosError) {
    return handleAxiosErrors(fallbackError);
  }

  return {
    status: defaultStatus,
    error: "Error",
    message: fallbackMessage,
  };
};

export const handleErrorInstances = (
  error: unknown,
  defaultMsg: string = "Something went wrong. Please try again.",
) => {
  if (!error) return "";

  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof AxiosError) {
    if (error.request) {
      return "Network error";
    } else if (error.response) {
      return (
        error.response.data.message ||
        error.response.data.error ||
        error.message
      );
    } else {
      return defaultMsg;
    }
  }

  const reqError = error as ErrorObject;

  if (reqError?.data) {
    if (Array.isArray(reqError?.data)) {
      return reqError?.data[0];
    } else if (typeof reqError?.data === "string") {
      return reqError?.data || defaultMsg;
    }
  } else if (reqError.message) {
    return reqError.message;
  }

  return defaultMsg;
};
