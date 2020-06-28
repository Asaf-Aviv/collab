const { v4: uuid } = require('uuid')

exports.stacks = ['React', 'TypeScript', 'JavaScript'].map(name => ({
  id: uuid(),
  name,
}))
