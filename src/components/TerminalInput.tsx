import { useRef, useState } from "react"

export function TerminalInput() {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="px-5 pt-2 pb-3 bg-chrome-bg-deep font-ui shrink-0">
      <span className="inline-block text-chrome-text-secondary px-2.5 py-[3px] rounded-full text-xs font-medium mb-2.5 border border-chrome-border">
        ~/moon-editor
      </span>
      <div
        className="relative flex items-center cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-sm text-chrome-text-tertiary whitespace-pre">
          {value || (!focused ? "Type '/' or 'help' to see options" : "")}
        </span>
        {focused && (
          <span className="inline-block w-[0.6em] h-[1.15em] rounded-[1px] animate-blink bg-chrome-text-accent" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-0 w-full opacity-0 font-ui text-sm"
        />
      </div>
    </div>
  )
}
