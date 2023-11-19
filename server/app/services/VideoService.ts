import BaseService from './BaseService'
import Drive from '@ioc:Adonis/Core/Drive'
import { VideoType } from 'App/Helpers/enums'
import Video from 'App/Models/Video'

class VideoService extends BaseService<typeof Video> {
  public override async store(
    video: any,
    path: string = '',
    prefix: string = '',
    type = VideoType.VIDEO
  ): Promise<Video> {
    await video.moveToDisk(path, {
      name: prefix + Date.now() + '.' + video.extname,
    })
    const videoName = video?.fileName

    const createdVideo = await Video.create({ url: path + videoName, type })

    return createdVideo
  }

  public override async destroy(id: number): Promise<Video> {
    const video = await this.modal.findOrFail(id)
    await Drive.delete(video.url)
    await video.delete()
    return video
  }
}

export default new VideoService(Video)
