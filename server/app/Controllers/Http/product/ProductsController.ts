import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

    if (payload.logo) {
      product.logo = await ResponsiveAttachment.fromFile(payload.logo)
    }

    if (payload.cover) {
      product.cover = await ResponsiveAttachment.fromFile(payload.cover)
    }

    if (payload.brocher) {
      product.brocher = await ResponsiveAttachment.fromFile(payload.brocher)
    }

    if (payload.images) {
      const images = await Promise.all(
        payload.images.map(async (img) => {
          try {
            const storeImg = await ImageService.store(img)
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

      await product.related('screenshots').saveMany(validImages as Image[])
    }

    if (payload.video) {
      const video = await VideoService.store(payload.video)
      product.related('video').save(video)
    }

    await product.save()

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

    if (payload.logo) {
      product.logo = await ResponsiveAttachment.fromFile(payload.logo)
    }

    if (payload.cover) {
      product.cover = await ResponsiveAttachment.fromFile(payload.cover)
    }

    if (payload.brocher) {
      product.brocher = await ResponsiveAttachment.fromFile(payload.brocher)
    }

    if (payload.images) {
      await product.load('screenshots')

      await Promise.all(
        product.screenshots.map(async (s) => {
          await s.delete()
        })
      )

      const images = await Promise.all(
        payload.images.map(async (img) => {
          try {
            const storeImg = await ImageService.store(img)
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
      await product.related('screenshots').saveMany(validImages as Image[])
    }

    if (payload.video) {
      await product.load('video')

      if (product.video) {
        await VideoService.destroy(product.video.id)
      }

      const video = await VideoService.store(payload.video)
      product.related('video').save(video)
    }

    await product.save()
    return response.json({ message: 'record updated', data: product })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const product = await Product.findOrFail(+params.id)
    await product.load('screenshots')
    await product.load('video')

    if (product.screenshots) {
      await Promise.all(
        product.screenshots.map(async (img) => {
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
