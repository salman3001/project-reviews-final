import BaseService from './BaseService'
import Image from 'App/Models/Image'
import Drive from '@ioc:Adonis/Core/Drive'
import { ImageTypes } from 'App/Helpers/enums'
import { v4 as uuidv4 } from 'uuid'

class ImageService extends BaseService<typeof Image> {
  public override async store(
    image: any,
    path: string = '',
    prefix: string = '',
    type: ImageTypes = ImageTypes.IMG
  ): Promise<Image> {
    await image.moveToDisk(path, {
      name: prefix + uuidv4() + '.' + image.extname,
    })
    const imageName = image?.fileName

    const createdImage = await Image.create({ url: path + imageName, type })

    return createdImage
  }

  public override async destroy(id: number): Promise<Image> {
    const image = await this.modal.findOrFail(id)
    await Drive.delete(image.url)
    await image.delete()
    return image
  }
}

export default new ImageService(Image)
