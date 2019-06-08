if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
  module.exports = require('./keys_s3_prod');
} else {
  module.exports = require('./keys_dev');
  module.exports = require('./keys_s3_dev');
}