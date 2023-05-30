declare namespace NodeJS {
  export type ProcessEnv = {
    /* APP */
    APP_PORT: string;
    APP_HOST: string;

    /* DATABASE */
    DATABASE_URL: string;
  };
}
