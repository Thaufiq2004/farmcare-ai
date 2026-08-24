export default function Problem() {
  return (
    <div className="deck-grain relative w-screen h-screen overflow-hidden bg-[#f4f0e6] text-[#123f38]">
      <div className="absolute left-0 top-0 h-full w-[22vw] bg-[#0d4b45]" />
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh]">
        <div className="flex justify-between text-[1.2vw] font-bold uppercase tracking-[0.2em] text-[#e0a92f]"><span>01 / The challenge</span><span>FarmCare AI</span></div>
        <div className="mt-[11vh] max-w-[70vw]">
          <h1 className="font-display text-[5.1vw] font-bold leading-[0.98] tracking-[-0.06em]">One farm. Three systems.<br /><span className="text-[#c95e3f]">Too many decisions.</span></h1>
          <p className="mt-[3vh] max-w-[47vw] text-[1.65vw] leading-[1.35] text-[#63746d]">The daily reality is connected. The tools and advice are not.</p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-x-[7vw] gap-y-[3vh] pb-[3vh] pl-[4vw]">
          <div className="border-t-2 border-[#0d4b45] pt-[1.6vh] text-[1.65vw] leading-[1.18]">Farmers manage crop, animal, and pond risks separately</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.6vh] text-[1.65vw] leading-[1.18]">Advice is often generic instead of district-aware</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.6vh] text-[1.65vw] leading-[1.18]">The next best action is buried in information</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.6vh] text-[1.65vw] leading-[1.18]">Small delays can become lost yield, animal health issues, or pond losses</div>
        </div>
        <div className="absolute bottom-[7vh] left-[2.8vw] h-[8vw] w-[8vw] rounded-full bg-[#e6b94a]" />
      </div>
    </div>
  );
}