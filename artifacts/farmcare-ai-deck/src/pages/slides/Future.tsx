export default function Future() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d4b45] text-[#f4f0e6]">
      <div className="absolute bottom-0 right-0 h-[38vh] w-[48vw] bg-[#123f38]" />
      <div className="absolute bottom-[8vh] right-[9vw] h-[19vw] w-[19vw] rounded-full border-[0.8vw] border-[#e6b94a]" />
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh]">
        <div className="flex justify-between text-[1.2vw] font-bold uppercase tracking-[0.2em] text-[#e6b94a]"><span>05 / The path forward</span><span>FarmCare AI</span></div>
        <div className="mt-[11vh] max-w-[76vw]"><h1 className="font-display text-[5.4vw] font-bold leading-[0.95] tracking-[-0.07em]">From prototype to<br /><span className="text-[#e6b94a]">trusted farm infrastructure</span></h1></div>
        <div className="mt-auto grid grid-cols-2 gap-x-[7vw] gap-y-[2.5vh] pb-[2vh]">
          <div className="flex gap-[1.5vw] text-[1.5vw]"><span className="text-[#e6b94a]">01</span>Today: a working, reviewable MVP with realistic seeded data</div>
          <div className="flex gap-[1.5vw] text-[1.5vw]"><span className="text-[#e6b94a]">02</span>Next: persistent farm profiles and API-backed advisories</div>
          <div className="flex gap-[1.5vw] text-[1.5vw]"><span className="text-[#e6b94a]">03</span>Connect weather, market, extension, and expert escalation services</div>
          <div className="flex gap-[1.5vw] text-[1.5vw]"><span className="text-[#e6b94a]">04</span>AI explains confidence and knows when to refer to a professional</div>
        </div>
        <p className="mt-[4vh] max-w-[50vw] text-[1.8vw] leading-[1.15] text-[#f4f0e6]/80">FarmCare AI turns complexity into the next right action</p>
      </div>
    </div>
  );
}