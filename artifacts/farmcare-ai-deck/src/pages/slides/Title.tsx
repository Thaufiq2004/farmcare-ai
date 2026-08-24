const base = import.meta.env.BASE_URL;

export default function Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d4b45] text-[#f4f0e6]">
      <img src={`${base}farmcare-hero.jpg`} crossOrigin="anonymous" alt="Bangladeshi farm at sunrise" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d4b45] via-[#0d4b45]/85 to-[#0d4b45]/20" />
      <div className="absolute right-[7vw] top-[9vh] h-[24vw] w-[24vw] rounded-full border border-[#e6b94a]/40" />
      <div className="absolute right-[13vw] top-[15vh] h-[12vw] w-[12vw] rounded-full border border-[#e6b94a]/30" />
      <div className="relative z-10 flex h-full flex-col justify-between px-[8vw] py-[8vh]">
        <div className="flex items-center gap-[1vw] text-[1.2vw] font-bold uppercase tracking-[0.22em] text-[#e6b94a]">
          <span className="h-[0.7vw] w-[0.7vw] rounded-full bg-[#e6b94a]" />
          Farm intelligence, made local
        </div>
        <div className="max-w-[60vw]">
          <p className="mb-[2vh] text-[1.7vw] font-medium tracking-[0.12em] text-[#f4f0e6]/75">BANGLADESH / FIELD SYSTEMS</p>
          <h1 className="font-display text-[8vw] font-bold leading-[0.88] tracking-[-0.07em]">FarmCare<br />AI</h1>
          <p className="mt-[4vh] max-w-[42vw] text-[2.3vw] leading-[1.2] text-[#f4f0e6]">A trusted AI field companion for Bangladesh</p>
          <p className="mt-[2vh] text-[1.55vw] font-bold uppercase tracking-[0.2em] text-[#e6b94a]">Crop. Livestock. Fisheries.</p>
        </div>
        <div className="flex items-end justify-between text-[1.25vw] text-[#f4f0e6]/70">
          <span>Project presentation</span>
          <span>01 / 06</span>
        </div>
      </div>
    </div>
  );
}