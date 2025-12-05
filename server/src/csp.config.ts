import helmet from 'helmet';

export function csp() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'self'"], //"'unsafe-inline'"
        'style-src': ["'self'"], //"'unsafe-inline'"
        'img-src': ["'self'", 'data:', 'blob:'],
        'font-src': ["'self'", 'https:', 'data:'],
        'connect-src': ["'self'"],
        'default-src': ["'self'"],
      },
    },
    xPoweredBy: false,
  });
}
