import BaseService from './BaseService'
import FavoriteLink from 'App/Models/FavoriteLink'

class FavoriteLinkService extends BaseService<typeof FavoriteLink> {}

export default new FavoriteLinkService(FavoriteLink)
