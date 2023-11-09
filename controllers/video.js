const { categories } = require('../config/const')
const wistia = require('../lib/wistia')

exports.video = async (req, res) => {
  const { categoryId } = req.params
  const category = categories[categoryId]

  const webstreamsData = await wistia.getProjectById(6568576)

  const videos = []
  for (let j = 0; j < category.medias.length; j += 1) {
    const mediaId = category.medias[j]
    const video = webstreamsData.medias.filter(
      media => parseInt(media.id, 10) === parseInt(mediaId, 10)
    )[0]

    if (video) videos.push(video)
  }

  const videoId = req.params.videoId || category.medias[0] || webstreamsData.medias[0].id

  const mainVideo = await wistia.getVideoById(videoId)

  res.render('pages/video', {
    layout: '../views/layouts/main',
    mainVideo,
    categorySlug: categoryId,
    categoryName: category.name,
    videos,
  })
}
