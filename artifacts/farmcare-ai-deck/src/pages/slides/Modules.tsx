export default function Modules() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f4f0e6] text-[#123f38]">
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh]">
        <div className="flex justify-between text-[1.2vw] font-bold uppercase tracking-[0.2em] text-[#c95e3f]"><span>03 / The system</span><span>Connected by design</span></div>
        <h1 className="mt-[11vh] max-w-[73vw] font-display text-[5vw] font-bold leading-[0.98] tracking-[-0.06em]">Three modules.<br /><span className="text-[#0d4b45]">One connected farm profile.</span></h1>
        <div className="mt-auto grid grid-cols-3 gap-[1.4vw] pb-[2vh]">
          <div className="bg-[#0d4b45] p-[2.2vw] text-[#f4f0e6]"><div className="text-[4vw] font-display font-bold text-[#e6b94a]">01</div><h2 className="mt-[5vh] text-[2.1vw] font-bold">Crop care</h2><p className="mt-[1.5vh] text-[1.35vw] leading-[1.3] text-[#f4f0e6]/75">Stage-based tasks, health signals, and diagnosis entry point</p></div>
          <div className="bg-[#e6b94a] p-[2.2vw] text-[#123f38]"><div className="text-[4vw] font-display font-bold text-[#0d4b45]">02</div><h2 className="mt-[5vh] text-[2.1vw] font-bold">Livestock</h2><p className="mt-[1.5vh] text-[1.35vw] leading-[1.3] text-[#123f38]/75">Herd health, vaccination windows, and check reminders</p></div>
          <div className="bg-[#c95e3f] p-[2.2vw] text-[#f4f0e6]"><div className="text-[4vw] font-display font-bold text-[#f4f0e6]">03</div><h2 className="mt-[5vh] text-[2.1vw] font-bold">Fisheries</h2><p className="mt-[1.5vh] text-[1.35vw] leading-[1.3] text-[#f4f0e6]/80">Pond water quality, feeding checks, and risk signals</p></div>
        </div>
        <p className="mt-[2vh] text-[1.35vw] text-[#63746d]">Shared timeline keeps every action in context</p>
      </div>
    </div>
  );
}