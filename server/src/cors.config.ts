import { StaticOrigin } from './app.interface';

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  `http://localhost:${process.env.PORT ?? 3000}`,
];

export const corsConfig = (whitelist: string[] = ACCEPTED_ORIGINS) => {
  return {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void,
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
};
