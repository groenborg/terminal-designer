export function NavItem({ onClick, label, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-chrome-bg-button border-none py-1.5 px-2 rounded cursor-pointer font-ui text-xs text-chrome-text-secondary hover:bg-chrome-bg-tertiary transition-colors duration-150"
    >
      <span className="font-bold">[{label}]</span> {text}
    </button>
  )
}

export function TopNav({ onToggleSidebar }) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-6 px-5 py-2 bg-chrome-bg-secondary backdrop-blur-md border-b border-chrome-border font-ui text-sm shrink-0 flex-wrap">
      <span className="font-bold text-chrome-text-primary">Moon Editor</span>
      <span className="bg-chrome-bg-button rounded py-1.5 px-2 text-xs text-chrome-text-secondary">
        Type{" "}
        <span className="text-chrome-text-primary font-semibold">help</span> for
        options
      </span>
      <NavItem onClick={onToggleSidebar} label="E" text="show editor" />
      <NavItem label="D" text="Docs" />
    </div>
  )
}
