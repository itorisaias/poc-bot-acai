import app from './config/express'
import { log } from './utils'

app()
  .then(() => log.info('Server running with success'))
  .catch(err => log.error(err))
