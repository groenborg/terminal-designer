import { useCallback, useEffect, useState } from "react"
import {
  DEFAULTS,
  EditorSidebar,
  ExportPanel,
  FooterBar,
  Preview,
  SecondaryBar,
  TerminalInput,
  TopNav,
} from "./components"

export default function MoonEditor() {
  const [variant, setVariant] = useState("dark")
  const [themes, setThemes] = useState(JSON.parse(JSON.stringify(DEFAULTS)))
  const [view, setView] = useState("preview")
  const [font, setFont] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const theme = themes[variant]

  const setProp = useCallback(
    (prop, val) => {
      setThemes((prev) => {
        const next = JSON.parse(JSON.stringify(prev))
        next[variant][prop] = val
        return next
      })
    },
    [variant],
  )

  const setPalette = useCallback(
    (idx, val) => {
      setThemes((prev) => {
        const next = JSON.parse(JSON.stringify(prev))
        next[variant].palette[idx] = val
        return next
      })
    },
    [variant],
  )

  const resetTheme = () => {
    setThemes((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      next[variant] = JSON.parse(JSON.stringify(DEFAULTS[variant]))
      return next
    })
  }

  useEffect(() => {
    const s = document.documentElement.style
    const bg = theme.background
    const fg = theme.foreground
    s.setProperty("--color-chrome-bg-deep", bg)
    s.setProperty("--color-chrome-bg-primary", `color-mix(in srgb, ${bg} 95%, ${fg})`)
    s.setProperty("--color-chrome-bg-secondary", `color-mix(in srgb, ${bg} 88%, ${fg})`)
    s.setProperty("--color-chrome-bg-tertiary", `color-mix(in srgb, ${bg} 80%, ${fg})`)
    s.setProperty("--color-chrome-bg-input", bg)
    s.setProperty("--color-chrome-bg-button", `color-mix(in srgb, ${fg} 10%, transparent)`)
    s.setProperty("--color-chrome-text-primary", fg)
    s.setProperty("--color-chrome-text-secondary", `color-mix(in srgb, ${fg} 70%, ${bg})`)
    s.setProperty("--color-chrome-text-tertiary", `color-mix(in srgb, ${fg} 45%, ${bg})`)
    s.setProperty("--color-chrome-text-accent", theme.cursorColor)
    s.setProperty("--color-chrome-text-green", theme.palette[2])
    s.setProperty("--color-chrome-border", `color-mix(in srgb, ${fg} 15%, transparent)`)
    s.setProperty("--color-chrome-border-focus", `color-mix(in srgb, ${fg} 25%, transparent)`)
  }, [theme])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return
      if (e.key === "e" || e.key === "E") {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setSidebarOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <TopNav onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {view === "preview" ? (
          <div className="flex-1 overflow-auto">
            <SecondaryBar variant={variant} />
            <Preview theme={theme} font={font} />
          </div>
        ) : (
          <div className="flex-1 overflow-auto py-6 px-8">
            <SecondaryBar variant={variant} />
            <ExportPanel theme={theme} variant={variant} font={font} />
          </div>
        )}
      </div>

      <TerminalInput />
      <FooterBar variant={variant} font={font} theme={theme} />

      <EditorSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={variant}
        setVariant={setVariant}
        view={view}
        setView={setView}
        font={font}
        setFont={setFont}
        theme={theme}
        setProp={setProp}
        setPalette={setPalette}
        resetTheme={resetTheme}
      />
    </>
  )
}
