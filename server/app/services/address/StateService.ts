import State from 'App/Models/address/State'
import BaseService from '../BaseService'

class StateService extends BaseService<typeof State> {}

export default new StateService(State)
