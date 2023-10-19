export interface AppConfig {
  endpoint: string;
}

const Environment = {
  Integration: 'Integration',
  Staging: 'Staging',
  Production: 'Production',
  Auto: 'None',
};

const environment = Environment.Auto;

const getConfig = (env: string): AppConfig => {
  switch (env) {
    case Environment.Integration:
      return {
        endpoint: '',
      };
    case Environment.Staging:
      return {
        endpoint: '',
      };
    case Environment.Production:
      return {
        endpoint: '',
      };
    default:
      return {
        endpoint: '',
      };
  }
};

export const getAppConfig = (): AppConfig => {
  return getConfig(environment);
};
