export interface GoogleTagManagerMainProperty {
  id: string
}

export interface GoogleTagManagerDefaultProperty {
  gtmBase?: string
  nsBase?: string
  environment?: GoogleTagManagerEnvironment
}

export interface GoogleTagManagerEnvironment {
  auth: string
  preview: string
}

export type GoogleTagManagerProperty = GoogleTagManagerMainProperty & GoogleTagManagerDefaultProperty

export type GoogleTagManagerOptions = GoogleTagManagerProperty | GoogleTagManagerProperty[]
