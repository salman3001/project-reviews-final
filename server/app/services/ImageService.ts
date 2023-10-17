import BaseService from './BaseService'
import Image from 'App/Models/Image'
import Drive from '@ioc:Adonis/Core/Drive'

class ImageService extends BaseService<typeof Image> {
  public override async store(image: any, path: string = '', prefix: string = ''): Promise<Image> {
    await image.moveToDisk(path, {
      name: prefix + Date.now() + '.' + image.extname,
    })
    const imageName = image?.fileName

    const createdImage = await Image.create({ url: path + imageName })

    return createdImage
  }

  public override async destroy(id: number): Promise<Image> {
    const image = await this.modal.findOrFail(id)
    Drive.delete(image.url)
    return image
  }
}

export default new ImageService(Image)
