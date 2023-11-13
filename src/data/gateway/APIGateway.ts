import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AppConfig, getAppConfig } from "../config";
import { NetError } from "src/domain/models/NetError";

export default class APIGateWay {
  private _timeOut = 60 * 1000;
  private _axios: AxiosInstance;
  private _apiConfig: AppConfig;

  constructor(extraHeaders?: object) {
    this._apiConfig = getAppConfig();

    const defaultHeaderOptions = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "ngrok-skip-browser-warning": "skip-browser-warning",
    };

    let config: AxiosRequestConfig = {
      baseURL: this._apiConfig.endpoint,
      timeout: this._timeOut,
      headers: { ...defaultHeaderOptions, ...extraHeaders },
    };

    this._axios = Axios.create(config);

    this._axios.interceptors.request.use(async function (config) {
      try {
        // NOTE: Config before call here
      } finally {
        return config;
      }
    });

    this._axios.interceptors.response.use(
      async function (response: any) {
        try {
          // Request was successful, e.g. HTTP code 200

          const { httpMetric } = response.config.metadata;

          // add any extra metric attributes if needed
          // httpMetric.putAttribute('userId', '12345678');

          httpMetric.setHttpResponseCode(response.status);
          httpMetric.setResponseContentType(response.headers["content-type"]);
          httpMetric.setResponsePayloadSize(response.headers["content-length"]);

          await httpMetric.stop();
        } finally {
          return response;
        }
      },
      async function (error) {
        try {
          const { httpMetric } = error.config.metadata;

          httpMetric.setHttpResponseCode(error.response.status);
          httpMetric.setResponseContentType(
            error.response.headers["content-type"]
          );
          await httpMetric.stop();
        } finally {
          return Promise.reject(error);
        }
      }
    );
  }

  private _makeUrl = (path: string) => {
    return `${this._apiConfig.endpoint}/${path}`;
  };

  private _handleSuccess = (response: AxiosResponse) => {
    const { status, data } = response;
    this._interceptResponseSuccess(response);

    if (status >= 200 && status < 300) {
      return data;
    }

    let error: NetError = { status: status, message: "" };
    return Promise.reject(error);
  };

  private _handleError = (axiosError: AxiosError) => {
    console.log({ axiosError });

    let error: NetError = {
      status: axiosError.response?.status || 200,
      // @ts-ignore
      message: axiosError.response?.data?.message || "",
      // @ts-ignore
      code: axiosError.response?.data?.code || null,
    };
    this._interceptResponseFailure(axiosError);
    return Promise.reject(error);
  };

  get = (path: string) => {
    this._interceptRequest("GET", path);
    return this._axios
      .get(this._makeUrl(path))
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  post = (path: string, body?: any) => {
    this._interceptRequest("POST", path, body);
    return this._axios
      .post(this._makeUrl(path), body)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  put = (path: string, body?: any) => {
    this._interceptRequest("PUT", path, body);
    return this._axios
      .put(this._makeUrl(path), body)
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  delete = (path: string) => {
    this._interceptRequest("DELETE", path);
    return this._axios
      .delete(this._makeUrl(path))
      .then(this._handleSuccess)
      .catch(this._handleError);
  };

  private _interceptRequest(method: string, path: string, data?: any) {
    console.log(
      "Request " + method + ": " + this._apiConfig.endpoint + "/" + path
    );
    if (data) {
      let requestString = JSON.stringify(data, null, 2);
      console.log(requestString);
    }
  }

  private _interceptResponseSuccess(response: AxiosResponse) {
    console.log(
      "Response Success " + response.config.method + ": " + response.config.url
    );
    if (response.data) {
      console.log(response.data);
    }
  }

  private _interceptResponseFailure(error: AxiosError) {
    if (error.response?.status === 401) {
    }

    if (error.response?.data) {
      console.log(error.response?.data);
    }
  }
}
