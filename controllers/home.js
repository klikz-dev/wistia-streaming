const { categories, heroVideoIds, featuredCategories } = require('../config/const')
const wistia = require('../lib/wistia')

exports.home = async (req, res) => {
  /**
   * Hero Videos
   */
  const promises = heroVideoIds.map(async heroVideoId => {
    const video = await wistia.getVideoById(heroVideoId)
    return video
  })
  const heroVideos = await Promise.all(promises)

  /**
   * Carousel Videos
   */
  const webstreamsData = await wistia.getProjectById(6568576)

  const carouselItems = []
  for (let i = 0; i < featuredCategories.length; i += 1) {
    const slug = featuredCategories[i]
    const category = categories[slug]

    const videos = []
    for (let j = 0; j < category.medias.length; j += 1) {
      const mediaId = category.medias[j]
      const video = webstreamsData.medias.filter(
        media => parseInt(media.id, 10) === parseInt(mediaId, 10)
      )[0]

      if (video) videos.push(video)
    }

    const videosGroup = []
    let videoIndex = 0
    while (videoIndex < videos.length) {
      videosGroup.push(videos.slice(videoIndex, videoIndex + 3))
      videoIndex += 3
    }

    carouselItems.push({
      slug,
      title: category.name,
      videosGroup,
    })
  }

  res.render('pages/home', { layout: '../views/layouts/main', heroVideos, carouselItems })
}
