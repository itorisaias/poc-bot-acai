import morgan from 'morgan';
import tracer from 'tracer';

const log = (() => {
  const logger = tracer.colorConsole();
  logger.requestLogger = morgan('dev');
  return logger;
})();

export { log };
