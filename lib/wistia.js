const request = require('request')

const wistia = (endpoint, method = 'GET') => {
  return new Promise((resolve, reject) => {
    request(
      {
        method,
        url: `${process.env.WISTIA_API_URL}/${endpoint}`,
        headers: {
          Authorization: `Bearer ${process.env.WISTIA_API_KEY}`,
        },
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

module.exports.getVideos = async () => {
  const videos = await wistia('/medias.json')
  return JSON.parse(videos)
}

module.exports.getVideoById = async videoId => {
  const video = await wistia(`/medias/${videoId}.json`)
  return JSON.parse(video)
}

module.exports.getProjects = async () => {
  const projects = await wistia('/projects.json')
  return JSON.parse(projects)
}

module.exports.getProjectById = async projectId => {
  const project = await wistia(`/projects/${projectId}.json`)
  return JSON.parse(project)
}
