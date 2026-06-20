import type { HtmlTagDescriptor, Plugin } from 'vite'
import type { VitePluginRadarOptions } from '../src'
import { describe, expect, it, vi } from 'vitest'
import { INJECTORS, VitePluginRadar } from '../src'

async function runPlugin(
  options: VitePluginRadarOptions,
  command: 'build' | 'serve' = 'build',
): Promise<HtmlTagDescriptor[]> {
  const plugin = VitePluginRadar(options) as Plugin & {
    configResolved: (config: any) => void
    transformIndexHtml: (...args: any[]) => Promise<HtmlTagDescriptor[]>
  }

  plugin.configResolved({ command })

  return (await plugin.transformIndexHtml('', {} as any)) ?? []
}

describe('output per config', () => {
  it('injects google analytics tags', async () => {
    const tags = await runPlugin({ analytics: { id: 'G-XXX' } })
    const serialized = JSON.stringify(tags)

    expect(serialized).toContain('gtag')
    expect(serialized).toContain('G-XXX')
  })

  it('injects posthog tags', async () => {
    const tags = await runPlugin({
      posthog: { enabled: true, token: 'tok', api_host: 'https://eu.i.posthog.com' },
    })

    expect(JSON.stringify(tags)).toContain('posthog.init')
  })

  it('returns no tags when nothing is configured', async () => {
    expect(await runPlugin({})).toEqual([])
  })
})

describe('lazy loading', () => {
  it('only loads the configured injectors', async () => {
    const spies = INJECTORS.map(entry => vi.spyOn(entry, 'load'))

    await runPlugin({ analytics: { id: 'G-1' } })

    for (const entry of INJECTORS) {
      if (entry.key === 'analytics')
        expect(entry.load).toHaveBeenCalledTimes(1)
      else
        expect(entry.load).not.toHaveBeenCalled()
    }

    spies.forEach(spy => spy.mockRestore())
  })
})

describe('injection order', () => {
  it('preserves registry order regardless of option key order', async () => {
    // options listed posthog-first on purpose; output must follow registry order
    const tags = await runPlugin({
      posthog: { enabled: true, token: 't', api_host: 'https://eu.i.posthog.com' },
      gtm: { id: 'GTM-1' },
      analytics: { id: 'G-1' },
    })
    const serialized = JSON.stringify(tags)

    // registry order: analytics -> gtm -> ... -> posthog
    expect(serialized.indexOf('G-1')).toBeLessThan(serialized.indexOf('GTM-1'))
    expect(serialized.indexOf('GTM-1')).toBeLessThan(serialized.indexOf('posthog.init'))
  })
})

describe('unbounce edge cases', () => {
  it('activates with `true`', async () => {
    const tags = await runPlugin({ unbounce: true })

    expect(JSON.stringify(tags)).toContain('_ubaq')
  })

  it('activates with `{ enabled: true }`', async () => {
    const tags = await runPlugin({ unbounce: { enabled: true, script: 'example.com/u.js' } })

    expect(JSON.stringify(tags)).toContain('example.com/u.js')
  })

  it('does not activate with `{ enabled: false }`', async () => {
    expect(await runPlugin({ unbounce: { enabled: false, script: 'x' } })).toEqual([])
  })

  it('does not activate with `false`', async () => {
    expect(await runPlugin({ unbounce: false })).toEqual([])
  })
})

describe('dev gating', () => {
  it('skips injection during `serve` by default', async () => {
    expect(await runPlugin({ analytics: { id: 'G-1' } }, 'serve')).toEqual([])
  })

  it('injects during `serve` when enableDev is true', async () => {
    const tags = await runPlugin({ analytics: { id: 'G-1' }, enableDev: true }, 'serve')

    expect(JSON.stringify(tags)).toContain('G-1')
  })
})
