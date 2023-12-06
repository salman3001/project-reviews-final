import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import BaseService from './BaseService'
import Video from 'App/Models/Video'

class VideoService extends BaseService<typeof Video> {
  public override async store(videoFile: any): Promise<Video> {
    const video = new Video()
    video.file = Attachment.fromFile(videoFile)
    await video.save()
    return video
  }

  public override async destroy(id: number): Promise<Video> {
    const video = await this.modal.findOrFail(id)
    await video.delete()
    return video
  }
}

export default new VideoService(Video)
