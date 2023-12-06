import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { ResponsiveAttachment } from '@ioc:Adonis/Addons/ResponsiveAttachment'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Image from 'App/Models/Image'
import Service from 'App/Models/service/Service'
import ServiceCreateValidator from 'App/Validators/service/ServiceCreateValidator'
import ServiceUpdateValidator from 'App/Validators/service/ServiceUpdateValidator'
import ImageService from 'App/services/ImageService'
import VideoService from 'App/services/VideoService'
import ServiceService from 'App/services/service/ServiceService'

export default class ServicesController {
  public async index({ request, response }: HttpContextContract) {
    const qs = request.qs() as any
    const records = await ServiceService.index(qs)
    return response.json(records)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ServiceCreateValidator)
    const service = await Service.create(payload.service)

    if (payload.seo) {
      await service.related('seo').create(payload.seo)
    }

    if (payload.tags) {
      await service.related('tags').attach(payload.tags)
    }

    if (payload.social) {
      await service.related('social').create(payload.social)
    }

    if (payload.faq) {
      await service.related('faqs').createMany(payload.faq)
    }

    if (payload.logo) {
      service.logo = await ResponsiveAttachment.fromFile(payload.logo)
    }

    if (payload.cover) {
      service.cover = await ResponsiveAttachment.fromFile(payload.cover)
    }

    if (payload.brocher) {
      service.brocher = await ResponsiveAttachment.fromFile(payload.brocher)
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
      await service.save()

      await service.related('screenshots').saveMany(validImages as Image[])
    }

    if (payload.video) {
      const video = await VideoService.store(payload.video)
      service.related('video').save(video)
    }

    await service.save()

    return response.json({ message: 'record created', data: service })
  }

  public async show({ params, response, request }: HttpContextContract) {
    const qs = request.qs() as any
    const record = await ServiceService.show(+params.id, qs)
    response.json(record)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const service = await Service.findOrFail(+params.id)
    const payload = await request.validate(ServiceUpdateValidator)

    if (payload.service) {
      service.merge(payload.service)
      await service.save()
    }

    if (payload.seo) {
      await service.load('seo')
      if (service.seo) {
        service.seo.merge(payload.seo)
        await service.seo.save()
      } else {
        await service.related('seo').create(payload.seo)
      }
    }

    if (payload.tags) {
      await service.related('tags').detach()
      await service.related('tags').attach(payload.tags)
    }

    if (payload.social) {
      await service.load('social')
      if (service.social) {
        service.social.merge(payload.social)
        await service.social.save()
      } else {
        await service.related('social').create(payload.social)
      }
    }

    if (payload.faq) {
      await service.load('faqs')
      if (service.faqs) {
        for (const f of service.faqs) {
          await f.delete()
        }
      }
      await service.related('faqs').createMany(payload.faq)
    }

    if (payload.logo) {
      service.logo = await ResponsiveAttachment.fromFile(payload.logo)
    }

    if (payload.cover) {
      service.cover = await ResponsiveAttachment.fromFile(payload.cover)
    }

    if (payload.brocher) {
      service.brocher = await ResponsiveAttachment.fromFile(payload.brocher)
    }

    if (payload.images) {
      await service.load('screenshots')

      await Promise.all(
        service.screenshots.map(async (s) => {
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
      await service.related('screenshots').saveMany(validImages as Image[])
    }

    if (payload.video) {
      await service.load('video')
      if (service.video) {
        await VideoService.destroy(service.video.id)
      }
      const video = await VideoService.store(payload.video)
      service.related('video').save(video)
    }

    await service.save()

    return response.json({ message: 'record updated', data: service })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const service = await Service.findOrFail(+params.id)
    await service.load('screenshots')
    await service.load('video')

    if (service.screenshots) {
      await Promise.all(
        service.screenshots.map(async (img) => {
          await ImageService.destroy(img.id)
        })
      )
    }

    if (service.video) {
      await VideoService.destroy(service.video.id)
    }

    await ServiceService.destroy(+params.id)
    return response.json({ message: 'record deleted' })
  }

  public async deleteScreenShot({ params, response }: HttpContextContract) {
    const image = await ImageService.destroy(+params.id)
    return response.json({ message: 'Screeshot deleted', image })
  }
}
