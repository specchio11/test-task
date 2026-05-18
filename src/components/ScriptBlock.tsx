interface Props {
  heading: string;
  english?: string;
  chinese?: string;
}

/** A white card showing English + 中文 scripts side-by-side (vertical stack). */
export function ScriptBlock({ heading, english, chinese }: Props) {
  return (
    <div className="script-block">
      <h4>{heading}</h4>
      {english && <blockquote>{english}</blockquote>}
      {chinese && <blockquote className="cn">{chinese}</blockquote>}
    </div>
  );
}

/** Plain English/中文 pair (used for opening/closing scripts). */
export function BilingualBlocks({ english, chinese }: { english: string; chinese: string }) {
  return (
    <>
      <div className="script-block">
        <h4>English</h4>
        <blockquote>{english}</blockquote>
      </div>
      <div className="script-block">
        <h4>中文</h4>
        <blockquote className="cn">{chinese}</blockquote>
      </div>
    </>
  );
}
