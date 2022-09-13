declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SLACK_TOKEN: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
    }
  }
}

export {};
