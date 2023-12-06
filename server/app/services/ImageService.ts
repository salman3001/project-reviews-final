import BaseService from './BaseService'
import Image from 'App/Models/Image'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'

class ImageService extends BaseService<typeof Image> {
  public override async store(image: any): Promise<Image> {
    const createdImage = new Image()
    createdImage.file = await ResponsiveAttachment.fromFile(image)
    await createdImage.save()
    return createdImage
  }

  public override async destroy(id: number): Promise<Image> {
    const image = await this.modal.findOrFail(id)
    await image.delete()
    return image
  }
}

export default new ImageService(Image)
