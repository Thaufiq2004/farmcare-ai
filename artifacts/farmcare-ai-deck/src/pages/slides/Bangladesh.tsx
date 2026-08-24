export default function Bangladesh() {
  return (
    <div className="deck-grain relative w-screen h-screen overflow-hidden bg-[#e6b94a] text-[#0d4b45]">
      <div className="absolute right-0 top-0 h-full w-[35vw] bg-[#c95e3f]" />
      <div className="absolute right-[8vw] top-[12vh] text-[12vw] font-display font-bold leading-none text-[#f4f0e6]/80">BD</div>
      <div className="relative flex h-full flex-col px-[8vw] py-[8vh]">
        <div className="flex justify-between text-[1.2vw] font-bold uppercase tracking-[0.2em]"><span>04 / Local advantage</span><span>Made for Bangladesh</span></div>
        <div className="mt-[13vh] max-w-[62vw]"><h1 className="font-display text-[6vw] font-bold leading-[0.94] tracking-[-0.07em]">Bangladesh is<br /><span className="text-[#c95e3f]">not an edge case</span></h1></div>
        <div className="mt-auto grid grid-cols-2 gap-x-[7vw] gap-y-[3vh] pb-[2vh]">
          <div className="border-t-2 border-[#0d4b45] pt-[1.4vh] text-[1.6vw]">Bangla-friendly interaction and local language cues</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.4vh] text-[1.6vw]">Aman rice, tomato, mustard, and local pond examples</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.4vh] text-[1.6vw]">BDT market intelligence for sell-or-hold decisions</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.4vh] text-[1.6vw]">District and upazila context</div>
          <div className="border-t-2 border-[#0d4b45] pt-[1.4vh] text-[1.6vw]">Low-bandwidth-friendly experience</div>
        </div>
      </div>
    </div>
  );
}