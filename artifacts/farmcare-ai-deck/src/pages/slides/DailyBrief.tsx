export default function DailyBrief() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d4b45] text-[#f4f0e6]">
      <div className="absolute right-[-8vw] top-[-12vw] h-[42vw] w-[42vw] rounded-full border-[1.2vw] border-[#e6b94a]" />
      <div className="absolute bottom-[-16vw] left-[-10vw] h-[34vw] w-[34vw] rounded-full border border-[#f4f0e6]/20" />
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh]">
        <div className="flex justify-between text-[1.2vw] font-bold uppercase tracking-[0.2em] text-[#e6b94a]"><span>02 / The product</span><span>Farm pulse</span></div>
        <div className="mt-[13vh] flex items-end justify-between">
          <h1 className="max-w-[58vw] font-display text-[6vw] font-bold leading-[0.95] tracking-[-0.07em]">A daily brief<br />built for the field</h1>
          <div className="mb-[1vh] w-[16vw] border-l border-[#e6b94a] pl-[1.5vw] text-[1.35vw] leading-[1.35] text-[#f4f0e6]/75">Less searching.<br />More doing.<br />Better timing.</div>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-x-[7vw] gap-y-[3vh] pb-[2vh]">
          <div className="flex gap-[1.5vw] text-[1.65vw] leading-[1.2]"><span className="mt-[0.5vh] h-[1.2vw] w-[1.2vw] shrink-0 rounded-full bg-[#e6b94a]" />One farm pulse across crops, livestock, and fisheries</div>
          <div className="flex gap-[1.5vw] text-[1.65vw] leading-[1.2]"><span className="mt-[0.5vh] h-[1.2vw] w-[1.2vw] shrink-0 rounded-full bg-[#e6b94a]" />Prioritized alerts with a clear next step</div>
          <div className="flex gap-[1.5vw] text-[1.65vw] leading-[1.2]"><span className="mt-[0.5vh] h-[1.2vw] w-[1.2vw] shrink-0 rounded-full bg-[#e6b94a]" />Local weather framing for Mymensingh and beyond</div>
          <div className="flex gap-[1.5vw] text-[1.65vw] leading-[1.2]"><span className="mt-[0.5vh] h-[1.2vw] w-[1.2vw] shrink-0 rounded-full bg-[#e6b94a]" />Designed for a quick glance, then action</div>
        </div>
      </div>
    </div>
  );
}