import _ from 'lodash'
import _fetch from 'isomorphic-fetch'


const BALANC_API = process.env.BALANC_API || 'https://balanc.eddyy.com/v1'


const defaults = {
  env: process.env.NODE_ENV,

  domain: typeof window !== 'undefined' ? window.location.hostname : undefined,
  domainEmail: undefined,

  userJwt: undefined,
  currency: undefined,
}

const defFields = Object.keys(defaults)


export class Balanc {
  constructor() {
    this._defaults = defaults
  }

  defaults(defaults) {
    this._defaults = _.pick(defaults, defFields)
  }

  transfer(from, amount, to, {text, ...rest} = {}) {
    const patchDefaults = _.pick(rest, defFields)
    const data = _.omit(rest, defFields)
    const body = {
      ...this._defaults,
      ...patchDefaults,

      from,
      amount,
      to,
      text,
      data,
    }
    this.fetch('transfer', {
      method: 'POST',
      body,
    })
  }

  fetch(pathname, option = {}) {
    const _opt = _.merge({
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
     }, option, {
      body: JSON.stringify(option.body),
    })
    return _fetch(`${BALANC_API}/${pathname}`, _opt)
  }
}


export default new Balanc()
