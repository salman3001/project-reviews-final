import BaseService from './BaseService'
import Image from 'App/Models/Image'

class ImageService extends BaseService<typeof Image> {
  public override async store(image: any, path: string = '', prefix: string = ''): Promise<Image> {
    await image.moveToDisk(path, {
      name: prefix + Date.now() + '.' + image.extname,
    })
    const imageName = image?.fileName

    const createdImage = await Image.create({ url: path + imageName })

    return createdImage
  }
}

export default new ImageService(Image)
