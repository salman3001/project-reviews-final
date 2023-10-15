import BaseService from './BaseService'
import Language from 'App/Models/Language'

class LanguageService extends BaseService<typeof Language> {}

export default new LanguageService(Language)
