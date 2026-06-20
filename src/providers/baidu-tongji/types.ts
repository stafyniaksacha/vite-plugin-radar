export interface BaiduTongjiDefaults {
  /**
   * `hm.js` script source
   */
  script?: string
  /**
   * `async` attribute set on the injected script tag
   */
  async?: boolean
  /**
   * Value pushed to `_hmt` for `_setAutoPageview`
   */
  autoPageview?: boolean
}

export interface BaiduTongjiProperty extends BaiduTongjiDefaults {
  id: string
}

export type BaiduTongjiOptions = BaiduTongjiProperty | BaiduTongjiProperty[]
