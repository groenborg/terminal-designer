export function Preview({ theme, font }) {
  const { foreground: fg, palette: p } = theme
  const c = (i: number) => ({ color: p[i] })
  const border = `1px solid color-mix(in srgb, ${fg} 20%, transparent)`

  return (
    <div
      className="py-6 px-8 text-sm leading-relaxed"
      style={{ fontFamily: `"${font}", var(--font-mono)`, color: fg }}
    >
      {/* Palette swatches */}
      <div className="grid grid-cols-8 gap-x-4 gap-y-1 mb-6 w-fit">
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block w-5 h-5 rounded-sm"
              style={{ background: p[i] }}
            />
            <span className="text-xs opacity-50">{i}</span>
          </div>
        ))}
      </div>

      {/* Code block with border */}
      <div className="mb-6 rounded" style={{ border }}>
        <div
          className="px-4 py-2 text-xs opacity-60"
          style={{ borderBottom: border }}
        >
          File: zigzagg.zig
        </div>
        <div className="px-4 py-3 whitespace-pre leading-[1.8]">
          <Line n={1}>
            <K p={p}>const</K> std = <Fn p={p}>@import</Fn>(<S p={p}>"std"</S>);
          </Line>
          <Line n={2} />
          <Line n={3}>
            <K p={p}>pub</K> <K p={p}>fn</K> <Fn p={p}>main</Fn>() !<T p={p}>void</T> {"{"}
          </Line>
          <Line n={4}>
            {"    "}<K p={p}>const</K> stdout = std.io.getStdOut().writer();
          </Line>
          <Line n={5}>
            {"    "}<K p={p}>var</K> i: <T p={p}>usize</T> = <N p={p}>1</N>;
          </Line>
          <Line n={6}>
            {"    "}<K p={p}>while</K> (i {"<="} <N p={p}>10</N>) : (i += <N p={p}>1</N>) {"{"}
          </Line>
          <Line n={7}>
            {"        "}<K p={p}>if</K> (i % <N p={p}>15</N> == <N p={p}>0</N>) {"{"}
          </Line>
          <Line n={8}>
            {"            "}<K p={p}>try</K> stdout.writeAll(<S p={p}>"ZigZagg\n"</S>);
          </Line>
          <Line n={9}>
            {"        }"} <K p={p}>else</K> <K p={p}>if</K> (i % <N p={p}>3</N> == <N p={p}>0</N>) {"{"}
          </Line>
          <Line n={10}>
            {"            "}<K p={p}>try</K> stdout.writeAll(<S p={p}>"Zig\n"</S>);
          </Line>
          <Line n={11}>
            {"        }"} <K p={p}>else</K> <K p={p}>if</K> (i % <N p={p}>5</N> == <N p={p}>0</N>) {"{"}
          </Line>
          <Line n={12}>
            {"            "}<K p={p}>try</K> stdout.writeAll(<S p={p}>"Zagg\n"</S>);
          </Line>
          <Line n={13}>
            {"        }"} <K p={p}>else</K> {"{"}
          </Line>
          <Line n={14}>
            {"            "}<K p={p}>try</K> stdout.<Fn p={p}>print</Fn>(<S p={p}>"{"{"}d{"}"}\n"</S>, .{"{"}i{"}"});
          </Line>
          <Line n={15}>
            {"        }"}
          </Line>
          <Line n={16}>
            {"    }"}
          </Line>
          <Line n={17}>
            {"}"}
          </Line>
        </div>
      </div>

      {/* Status line */}
      <div className="mb-6 text-xs">
        <span style={c(2)}>ghostty</span> on{" "}
        <span style={c(5)}>P</span>{" "}
        <span style={c(6)}>main [+]</span> via{" "}
        <span style={c(3)}>zig v0.13.0</span> via{" "}
        <span style={c(4)}>impure (ghostty-env)</span>
        {"\n"}
        <span style={c(1)}>{">"}</span> at <span className="underline" style={c(4)}>18:34:19</span>
      </div>

      {/* Rich text paragraph */}
      <div className="leading-[1.8]">
        Lorem <span className="font-bold" style={c(5)}>ipsum</span> dolor sit amet,{" "}
        <span className="font-bold">consectetur</span> adipiscing elit. Cras hendrerit aliquet turpis non dictum.{" "}
        Mauris pulvinar nisi sit amet <span className="font-bold" style={c(1)}>dui</span> cursus tempus.{" "}
        Pellentesque ut <span className="font-bold" style={c(1)}>dui</span> justo.{" "}
        Etiam quis magna sagittis nisi pretium consequat vitae ut nisl.{" "}
        Sed at metus id <span className="font-bold" style={c(4)}>odio</span> pulvinar sodales.{" "}
        Vestibulum sollicitudin, sem id tristique vestibulum, neque ante dictum tortor, in convallis mi orci ac lorem.{" "}
        Suspendisse orci ex, ullamcorper sed leo vitae, mattis egestas nisl.{" "}
        Morbi id est vel <span className="italic" style={c(6)}>nibh mollis</span> convallis vel et mauris.{" "}
        Duis vehicula facilisis placerat.{" "}
        Aliquam venenatis <span className="font-bold underline" style={c(3)}>auctor</span>{" "}
        <span className="italic" style={c(6)}>ipsum</span> vel elementum.{" "}
        Proin ac tincidunt lacus. Sed facilisis tellus ullamcorper bibendum lobortis.{" "}
        Pellentesque porta, lacus quis efficitur pulvinar, sem eu varius ante, sed finibus diam ante et risus.{" "}
        Morbi ut <span className="font-bold" style={c(2)}>sollicitudin</span> justo.{" "}
        Nulla mattis est ac mauris tincidunt tempor.{" "}
        Morbi vel gravida erat. Ut eu risus quis nisi facilisis aliquet varius id orci.{" "}
        Pellentesque tortor diam, porttitor nec urna nec,{" "}
        <span className="font-bold">convallis</span> consectetur dui.{" "}
        Vestibulum et hendrerit ipsum. Morbi pharetra dictum turpis in elementum. Ut nec{" "}
      </div>
    </div>
  )
}

function Line({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="inline-block w-8 text-right mr-4 opacity-30 select-none shrink-0">
        {n}
      </span>
      <span>{children}</span>
    </div>
  )
}

function K({ p, children }: { p: string[]; children: React.ReactNode }) {
  return <span style={{ color: p[5] }}>{children}</span>
}

function Fn({ p, children }: { p: string[]; children: React.ReactNode }) {
  return <span style={{ color: p[4] }}>{children}</span>
}

function S({ p, children }: { p: string[]; children: React.ReactNode }) {
  return <span style={{ color: p[2] }}>{children}</span>
}

function T({ p, children }: { p: string[]; children: React.ReactNode }) {
  return <span style={{ color: p[6] }}>{children}</span>
}

function N({ p, children }: { p: string[]; children: React.ReactNode }) {
  return <span style={{ color: p[3] }}>{children}</span>
}
