import { StaticOrigin } from './app.interface';
import { appOrigin, port } from './constants';

const ACCEPTED_ORIGINS = [`http://localhost:${port}`, appOrigin];

export const corsConfig = () => {
  return {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, origin?: StaticOrigin) => void,
    ) {
      if (!origin || ACCEPTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
};
