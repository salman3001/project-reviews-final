import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ImageTypes } from 'App/Helpers/enums'
import Image from 'App/Models/Image'
import Product from 'App/Models/product/Product'
import ProductCreateValidator from 'App/Validators/product/ProductCreateValidator'
import ProductUpdateValidator from 'App/Validators/product/ProductUpdateValidator'
import ImageService from 'App/services/ImageService'
import VideoService from 'App/services/VideoService'
import ProductService from 'App/services/product/ProductService'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ProductService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ProductCreateValidator)
    const product = await Product.create(payload.product)

    if (payload.seo) {
      await product.related('seo').create(payload.seo)
    }

    if (payload.tags) {
      await product.related('tags').attach(payload.tags)
    }

    if (payload.social) {
      await product.related('social').create(payload.social)
    }

    if (payload.faq) {
      await product.related('faq').createMany(payload.faq)
    }

    const productFolderName = `product-${product.id}`

    if (payload.logo) {
      const img = await ImageService.store(
        payload.logo,
        `/products/${productFolderName}/logos/`,
        'Product-logo',
        ImageTypes.THUMB
      )

      await product.related('images').save(img)
    }

    if (payload.cover) {
      const img = await ImageService.store(
        payload.cover,
        `/products/${productFolderName}/cover/`,
        'Product-cover',
        ImageTypes.COVER
      )

      await product.related('images').save(img)
    }

    if (payload.brocher) {
      const img = await ImageService.store(
        payload.brocher,
        `/products/${productFolderName}/brocher/`,
        'Product-brocher',
        ImageTypes.BROCHER
      )

      await product.related('images').save(img)
    }

    if (payload.images) {
      const images = await Promise.all(
        payload.images.map(async (img) => {
          try {
            const storeImg = await ImageService.store(
              img,
              `/products/${productFolderName}/screenshots/`,
              'Product-Screeshot',
              ImageTypes.IMG
            )
            return storeImg
          } catch (error) {
            console.error('Error storing image:', error)
            // Handle the error or decide whether to skip this image
            return null
          }
        })
      )

      // Filter out any null values (images that failed to store)
      const validImages = images.filter((img) => img !== null)

      await product.related('images').saveMany(validImages as Image[])
    }

    if (payload.video) {
      const video = await VideoService.store(
        payload.video,
        `/products/${productFolderName}/video/`,
        'Product-video'
      )

      await product.related('video').save(video)
    }

    return response.json({ message: 'record created', data: product })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ProductService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const product = await Product.findOrFail(+params.id)
    const payload = await request.validate(ProductUpdateValidator)

    if (payload.product) {
      product.merge(payload.product)
      await product.save()
    }

    if (payload.seo) {
      await product.load('seo')
      if (product.seo) {
        product.seo.merge(payload.seo)
        await product.seo.save()
      } else {
        await product.related('seo').create(payload.seo)
      }
    }

    if (payload.tags) {
      await product.related('tags').detach()
      await product.related('tags').attach(payload.tags)
    }

    if (payload.social) {
      await product.load('social')
      if (product.social) {
        product.social.merge(payload.social)
        await product.social.save()
      } else {
        await product.related('social').create(payload.social)
      }
    }

    if (payload.faq) {
      await product.load('faq')
      if (product.faq) {
        for (const f of product.faq) {
          await f.delete()
        }
      }
      await product.related('faq').createMany(payload.faq)
    }

    const productFolderName = `product-${product.id}`

    await product.load('images')

    if (payload.logo) {
      if (product.logo) {
        await ImageService.destroy(product?.logo?.id)
      }
      const img = await ImageService.store(
        payload.logo,
        `/products/${productFolderName}/logos/`,
        'Product-logo',
        ImageTypes.THUMB
      )

      await product.related('images').save(img)
    }

    if (payload.cover) {
      if (product.coverImage) {
        await ImageService.destroy(product?.coverImage?.id)
      }
      const img = await ImageService.store(
        payload.cover,
        `/products/${productFolderName}/cover/`,
        'Product-cover',
        ImageTypes.COVER
      )

      await product.related('images').save(img)
    }

    if (payload.brocher) {
      if (product.brocherImage) {
        await ImageService.destroy(product?.brocherImage?.id)
      }
      const img = await ImageService.store(
        payload.brocher,
        `/products/${productFolderName}/brocher/`,
        'Product-brocher',
        ImageTypes.BROCHER
      )

      await product.related('images').save(img)
    }

    if (payload.images) {
      const images = await Promise.all(
        payload.images.map(async (img) => {
          try {
            const storeImg = await ImageService.store(
              img,
              `/products/${productFolderName}/screenshots/`,
              'Product-Screeshot',
              ImageTypes.IMG
            )
            return storeImg
          } catch (error) {
            console.error('Error storing image:', error)
            // Handle the error or decide whether to skip this image
            return null
          }
        })
      )

      // Filter out any null values (images that failed to store)
      const validImages = images.filter((img) => img !== null)

      await product.related('images').saveMany(validImages as Image[])
    }

    if (payload.video) {
      await product.load('video')
      if (product.video) {
        await VideoService.destroy(product?.video?.id)
      }
      const video = await VideoService.store(
        payload.video,
        `/products/${productFolderName}/video/`,
        'Product-video'
      )

      await product.related('video').save(video)
    }
    return response.json({ message: 'record updated', data: product })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const product = await Product.findOrFail(+params.id)
    await product.load('images')
    await product.load('video')

    if (product.images) {
      await Promise.all(
        product.images.map(async (img) => {
          await ImageService.destroy(img.id)
        })
      )
    }

    if (product.video) {
      await VideoService.destroy(product.video.id)
    }
    await ProductService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async deleteScreenShot({ params, response }: HttpContextContract) {
    const image = await ImageService.destroy(+params.id)
    return response.json({ message: 'Screeshot deleted', image })
  }
}
