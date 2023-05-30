import { Environment } from '../namespaces';

export const environments = (): Environment.CONFIG => {
  return {
    APP: {
      HOST: process.env.APP_HOST,
      PORT: Number(process.env.APP_PORT || 3333),
    },
  };
};
