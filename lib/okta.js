const request = require('request')

const okta = (endpoint, method = 'POST', body = '{}') => {
  return new Promise((resolve, reject) => {
    request(
      {
        method,
        url: `${process.env.OKTA_API_URL}/${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      },
      (error, response) => {
        if (error) {
          reject(error)
        }
        return resolve(response.body)
      }
    )
  })
}

module.exports.auth = async (username, password) => {
  const userRes = await okta(
    '/authn',
    'POST',
    JSON.stringify({
      username,
      password,
    })
  )
  const userData = JSON.parse(userRes)

  // eslint-disable-next-line no-underscore-dangle
  const { user } = userData ? userData._embedded : {}

  return user
}
