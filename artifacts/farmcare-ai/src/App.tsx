import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CloudSun,
  Droplets,
  Fish,
  Gauge,
  Leaf,
  MapPin,
  MessageCircle,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings as SettingsIcon,
  ShieldCheck,
  Sprout,
  Store,
  Sun,
  Thermometer,
  Tractor,
  TrendingDown,
  TrendingUp,
  Waves,
  Wheat,
  X,
  type LucideIcon,
} from 'lucide-react';
import NotFound from '@/pages/not-found';
import { Route, Switch, Link, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Language = 'en' | 'bn';
type AlertItem = {
  id: number;
  severity: 'high' | 'watch' | 'info';
  title: string;
  detail: string;
  module: string;
  due: string;
};

const labels = {
  en: {
    overview: 'Overview',
    crops: 'Crop care',
    livestock: 'Livestock',
    fisheries: 'Fisheries',
    market: 'Market',
    assistant: 'Field assistant',
    settings: 'Settings',
    goodMorning: 'Good morning, Rahim',
    farmStatus: 'Here is your farm pulse for today.',
    today: 'Tuesday, 18 June 2024',
    ask: 'Ask FarmCare',
    log: 'Log field update',
    all: 'All',
    healthy: 'Healthy',
    attention: 'Needs attention',
    open: 'Open',
    save: 'Save changes',
  },
  bn: {
    overview: 'সারাংশ',
    crops: 'ফসল পরিচর্যা',
    livestock: 'গবাদিপশু',
    fisheries: 'মৎস্য',
    market: 'বাজার',
    assistant: 'কৃষি সহকারী',
    settings: 'সেটিংস',
    goodMorning: 'শুভ সকাল, রহিম',
    farmStatus: 'আজকের খামারের অবস্থা দেখুন।',
    today: 'মঙ্গলবার, ১৮ জুন ২০২৪',
    ask: 'FarmCare-কে জিজ্ঞেস করুন',
    log: 'মাঠের তথ্য যোগ করুন',
    all: 'সব',
    healthy: 'সুস্থ',
    attention: 'মনোযোগ দরকার',
    open: 'খোলা',
    save: 'পরিবর্তন সংরক্ষণ',
  },
} as const;

const seededAlerts: AlertItem[] = [
  { id: 1, severity: 'high', title: 'Brown planthopper watch', detail: 'Aman rice in Block A is at higher risk after humid nights.', module: 'Crops', due: 'Today' },
  { id: 2, severity: 'watch', title: 'Pond water needs testing', detail: 'Pond 02 pH is trending low. Test before the next feed.', module: 'Fisheries', due: 'Tomorrow' },
  { id: 3, severity: 'info', title: 'Vaccination window opens', detail: 'Your dairy cattle are due for FMD vaccination this week.', module: 'Livestock', due: '20 Jun' },
];

const navItems: { href: string; label: keyof typeof labels.en; icon: LucideIcon }[] = [
  { href: '/', label: 'overview', icon: Gauge },
  { href: '/crops', label: 'crops', icon: Wheat },
  { href: '/livestock', label: 'livestock', icon: Tractor },
  { href: '/fisheries', label: 'fisheries', icon: Fish },
  { href: '/market', label: 'market', icon: Store },
  { href: '/assistant', label: 'assistant', icon: MessageCircle },
];

function IconBadge({ icon: Icon, tone = 'teal' }: { icon: LucideIcon; tone?: 'teal' | 'sun' | 'clay' | 'water' }) {
  const toneClass = {
    teal: 'bg-[#dcece6] text-[#226353]',
    sun: 'bg-[#f9e8b4] text-[#805f1c]',
    clay: 'bg-[#f5ded5] text-[#a64e37]',
    water: 'bg-[#d9edf0] text-[#23727d]',
  }[tone];
  return <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneClass}`}><Icon size={19} strokeWidth={1.8} /></span>;
}

function StatusPill({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'sun' | 'clay' | 'water' }) {
  const styles = {
    teal: 'bg-[#e1f0e9] text-[#276957]',
    sun: 'bg-[#fbefc8] text-[#8a681c]',
    clay: 'bg-[#f7e1da] text-[#a34e38]',
    water: 'bg-[#dceff1] text-[#287782]',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles}`}>{children}</span>;
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-[#dfdfd3] bg-[#fffefa] shadow-[0_2px_8px_rgba(24,61,51,.045)] ${className}`}>{children}</section>;
}

function Shell({ children, language, onLanguage }: { children: ReactNode; language: Language; onLanguage: () => void }) {
  const [location] = useLocation();
  const t = labels[language];
  return (
    <div className="min-h-[100dvh] bg-[#f5f4ed] text-[#203c35]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[246px] flex-col border-r border-[#355a4e] bg-[#163f35] px-5 py-6 text-[#f4f0df] lg:flex">
        <Link href="/" className="mb-10 flex items-center gap-3" data-testid="link-brand">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5c95a] text-[#183d33]"><Sprout size={21} /></span>
          <span><strong className="block font-display text-[21px] leading-none tracking-[-.02em]">FarmCare</strong><small className="mt-1 block text-[10px] font-semibold uppercase tracking-[.18em] text-[#b8cfc1]">AI field companion</small></span>
        </Link>
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#8faf9f]">{language === 'bn' ? 'আপনার কাজ' : 'Your workspace'}</div>
        <nav className="space-y-1.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = location === href;
            return <Link key={href} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? 'bg-[#f5c95a] text-[#183d33] shadow-[0_4px_10px_rgba(0,0,0,.1)]' : 'text-[#bed2c5] hover:bg-[#254f43] hover:text-[#fff9e7]'}`} data-testid={`link-nav-${label}`}>
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} /><span>{t[label]}</span>{active && <ChevronRight size={15} className="ml-auto" />}
            </Link>;
          })}
        </nav>
        <div className="mt-auto">
          <div className="mb-5 rounded-2xl border border-[#44695a] bg-[#224c40] p-4">
            <div className="mb-3 flex items-center gap-2 text-[#f6d77d]"><Sun size={16} /><span className="text-xs font-semibold">Today at a glance</span></div>
            <p className="text-2xl font-semibold tracking-tight">29° <span className="text-sm font-normal text-[#b8cfc1]">/ 82°F</span></p>
            <p className="mt-1 text-xs text-[#b8cfc1]">Mymensingh · humid morning</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#375f52]"><div className="h-full w-[68%] rounded-full bg-[#f5c95a]" /></div>
            <p className="mt-2 text-[10px] text-[#b8cfc1]">Rain chance 68% · good planting window</p>
          </div>
          <Link href="/settings" className="flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[#254f43]" data-testid="link-profile-sidebar">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d5e5d4] text-sm font-bold text-[#28594c]">RH</span>
            <span className="min-w-0"><strong className="block truncate text-sm">Rahim Hossain</strong><small className="block truncate text-[11px] text-[#a9c5b6]">Bhaluka, Mymensingh</small></span>
          </Link>
        </div>
      </aside>
      <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-[#e2e1d8] bg-[#f5f4ed]/95 px-4 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2" data-testid="link-brand-mobile">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f5c95a] text-[#183d33]"><Sprout size={19} /></span><strong className="font-display text-lg">FarmCare</strong>
        </Link>
        <div className="flex items-center gap-2"><button className="rounded-lg p-2 text-[#557268] hover:bg-[#e8e8dd]" onClick={onLanguage} data-testid="button-language-mobile">{language === 'en' ? 'বাং' : 'EN'}</button><Link href="/settings" className="grid h-9 w-9 place-items-center rounded-full bg-[#d5e5d4] text-xs font-bold text-[#28594c]" data-testid="link-profile-mobile">RH</Link></div>
      </header>
      <main className="min-h-[100dvh] lg:ml-[246px]">
        <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-10 lg:py-8">{children}</div>
      </main>
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border border-[#d8dbd0] bg-[#fffefa]/95 p-1.5 shadow-[0_8px_30px_rgba(24,61,51,.16)] backdrop-blur lg:hidden">
        {[navItems[0], navItems[1], navItems[3], navItems[4], navItems[5]].map(({ href, label, icon: Icon }) => {
          const active = location === href;
          return <Link key={href} href={href} className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold ${active ? 'bg-[#e4f0e8] text-[#23624f]' : 'text-[#71847c]'}`} data-testid={`link-mobile-nav-${label}`}><Icon size={17} /><span>{t[label]}</span></Link>;
        })}
      </nav>
    </div>
  );
}

function PageHeader({ eyebrow, title, description, action, language }: { eyebrow: string; title: string; description: string; action?: ReactNode; language: Language }) {
  return <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div className="animate-rise-in">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#9a7130]"><span className="h-1.5 w-1.5 rounded-full bg-[#e0ad3d]" />{eyebrow}</p>
      <h1 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.02] tracking-[-.035em] text-[#183f35]">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#667b72]">{description} {language === 'bn' && <span className="font-bangla text-[#477268]">বাংলাদেশের মাঠের জন্য তৈরি।</span>}</p>
    </div>
    {action}
  </header>;
}

function Overview({ language, alerts, onDismiss, onLanguage }: { language: Language; alerts: AlertItem[]; onDismiss: (id: number) => void; onLanguage: () => void }) {
  const t = labels[language];
  const [showLog, setShowLog] = useState(false);
  const [note, setNote] = useState('');
  const [updates, setUpdates] = useState(['Irrigated Aman Block A', 'Checked Pond 02 aeration']);
  const [activeFilter, setActiveFilter] = useState('All');
  const filterLabels = ['All', 'Crops', 'Livestock', 'Fisheries'];
  const visibleAlerts = alerts.filter((a) => activeFilter === 'All' || a.module === activeFilter);
  return <div>
    <PageHeader language={language} eyebrow="Tuesday field brief · Mymensingh" title={t.goodMorning} description={t.farmStatus} action={<div className="flex items-center gap-2"><button onClick={onLanguage} className="hidden rounded-xl border border-[#dcdcd0] bg-[#fffefa] px-3 py-2 text-xs font-semibold text-[#557268] hover:bg-[#edeee4] sm:block" data-testid="button-language">{language === 'en' ? 'বাংলা' : 'English'}</button><button onClick={() => setShowLog(true)} className="flex items-center gap-2 rounded-xl bg-[#1f5e4e] px-3.5 py-2.5 text-sm font-semibold text-[#fffbea] shadow-sm transition-transform hover:-translate-y-0.5" data-testid="button-log-update"><Plus size={16} />{t.log}</button></div>} />
    <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[
        { label: 'Farm area', value: '4.8', unit: 'acres', note: '3 growing zones', icon: Leaf, tone: 'teal' as const },
        { label: 'Active crops', value: '06', unit: 'plots', note: '1 needs attention', icon: Wheat, tone: 'sun' as const },
        { label: 'Livestock', value: '18', unit: 'animals', note: 'All checks on track', icon: Activity, tone: 'clay' as const },
        { label: 'Pond health', value: '82', unit: '/ 100', note: 'Pond 02 to review', icon: Waves, tone: 'water' as const },
      ].map((stat, i) => <Panel key={stat.label} className={`animate-rise-in delay-${i + 1} p-4 sm:p-5`}><div className="mb-5 flex items-start justify-between"><span className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#82928b]">{stat.label}</span><IconBadge icon={stat.icon} tone={stat.tone} /></div><div className="flex items-baseline gap-1"><strong className="font-display text-3xl text-[#214d40]">{stat.value}</strong><span className="text-xs text-[#82928b]">{stat.unit}</span></div><p className="mt-2 text-xs text-[#61786e]">{stat.note}</p></Panel>)}
    </div>
    <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
      <Panel className="animate-rise-in delay-2 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e8e7dc] px-5 py-4"><div><h2 className="font-display text-xl text-[#214d40]">Needs your attention</h2><p className="mt-1 text-xs text-[#82928b]">Prioritised by crop, weather, and due date</p></div><span className="rounded-full bg-[#f9e8b4] px-2 py-1 text-[11px] font-bold text-[#80601f]">{visibleAlerts.length} open</span></div>
        <div className="flex gap-2 overflow-x-auto border-b border-[#e8e7dc] px-5 py-3 scrollbar-none">{filterLabels.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${activeFilter === filter ? 'bg-[#1f5e4e] text-white' : 'bg-[#f0f0e7] text-[#74867e] hover:bg-[#e5e7dc]'}`} data-testid={`button-alert-filter-${filter.toLowerCase()}`}>{filter === 'All' ? t.all : filter}</button>)}</div>
        {visibleAlerts.length === 0 ? <div className="p-8 text-center"><CheckCircle2 className="mx-auto mb-2 text-[#4e8e72]" size={24} /><p className="text-sm font-semibold text-[#375e52]">No open alerts in this module</p></div> : <div className="divide-y divide-[#ecebe2]">{visibleAlerts.map((alert) => <div key={alert.id} className="group flex gap-3 px-5 py-4 transition-colors hover:bg-[#fbfaf2]" data-testid={`alert-card-${alert.id}`}><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${alert.severity === 'high' ? 'bg-[#c96449]' : alert.severity === 'watch' ? 'bg-[#dcae3c]' : 'bg-[#4c9b84]'}`} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-semibold text-[#2d5147]">{alert.title}</h3><StatusPill tone={alert.severity === 'high' ? 'clay' : alert.severity === 'watch' ? 'sun' : 'teal'}>{alert.module}</StatusPill></div><p className="mt-1 text-xs leading-5 text-[#74867e]">{alert.detail}</p><div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#9b7132]"><Clock3 size={12} /> Due {alert.due}</div></div><button onClick={() => onDismiss(alert.id)} className="self-start rounded-lg p-1.5 text-[#9aaca3] opacity-0 transition-opacity hover:bg-[#f2e9d7] hover:text-[#9b7132] group-hover:opacity-100" aria-label={`Dismiss ${alert.title}`} data-testid={`button-dismiss-alert-${alert.id}`}><X size={16} /></button></div>)}</div>}
      </Panel>
      <Panel className="animate-rise-in delay-3 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e8e7dc] px-5 py-4"><div><h2 className="font-display text-xl text-[#214d40]">Field log</h2><p className="mt-1 text-xs text-[#82928b]">Your latest farm activity</p></div><button onClick={() => setShowLog(true)} className="rounded-lg p-2 text-[#477668] hover:bg-[#e8eee8]" aria-label="Add field log" data-testid="button-add-field-log"><Plus size={17} /></button></div>
        <div className="p-5"><div className="relative space-y-5 pl-5 before:absolute before:bottom-1 before:left-[6px] before:top-1 before:w-px before:bg-[#d6e2d8]">{updates.map((update, index) => <div className="relative" key={`${update}-${index}`} data-testid={`text-field-update-${index}`}><span className="absolute -left-[23px] top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-[#fffefa] bg-[#4e8e72] ring-1 ring-[#b9d3c3]"><Check size={8} className="text-white" /></span><p className="text-sm font-medium text-[#395f52]">{update}</p><p className="mt-1 text-[11px] text-[#98a79f]">{index === 0 ? 'Today · 07:40' : 'Yesterday · 18:15'}</p></div>)}</div><button onClick={() => setShowLog(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#b9d3c3] py-2.5 text-xs font-semibold text-[#477668] hover:bg-[#f0f6ef]" data-testid="button-log-another"><Plus size={14} /> Add another update</button></div>
      </Panel>
    </div>
    <Panel className="mt-6 animate-rise-in delay-4 overflow-hidden bg-[#1f5e4e] text-[#f5f0dc]"><div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"><div><div className="mb-2 flex items-center gap-2 text-[#f5c95a]"><CloudSun size={18} /><span className="text-xs font-bold uppercase tracking-[.14em]">Weather window</span></div><h2 className="font-display text-2xl">A good day to inspect, not irrigate.</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#bfd6c7]">Light rain is likely after 4pm. Walk the tomato rows before lunch and hold off on the next irrigation cycle.</p></div><Link href="/assistant" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f5c95a] px-4 py-3 text-sm font-bold text-[#183d33] transition-transform hover:-translate-y-0.5" data-testid="link-weather-assistant">{t.ask}<ArrowUpRight size={16} /></Link></div></Panel>
    {showLog && <div className="fixed inset-0 z-50 grid place-items-center bg-[#153b32]/40 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-[#dedfd3] bg-[#fffefa] p-5 shadow-[0_20px_50px_rgba(24,61,51,.22)]"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.15em] text-[#9b7132]">Quick action</p><h2 className="mt-1 font-display text-2xl text-[#214d40]">Log field update</h2></div><button onClick={() => setShowLog(false)} className="rounded-lg p-1.5 text-[#789087] hover:bg-[#eff1e8]" data-testid="button-close-log"><X size={18} /></button></div><label className="mt-5 block text-xs font-bold text-[#45665a]">What did you do?</label><input value={note} onChange={(e) => setNote(e.target.value)} autoFocus placeholder="e.g. Applied compost to tomato bed" className="mt-2 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm outline-none ring-[#77a98d] placeholder:text-[#a7b2ad] focus:ring-2" data-testid="input-field-update" /><button onClick={() => { if (note.trim()) { setUpdates((current) => [note.trim(), ...current]); setNote(''); setShowLog(false); } }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f5e4e] py-3 text-sm font-bold text-[#fffbea] hover:bg-[#184c40]" data-testid="button-submit-field-update"><Check size={16} /> Save update</button></div></div>}
  </div>;
}

function Crops({ language }: { language: Language }) {
  const [filter, setFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [crops, setCrops] = useState([
    { id: 1, name: 'Aman rice', variety: 'BRRI dhan 49', stage: 'Tillering', health: 'Healthy', action: 'Scout for planthopper', days: '78 days to harvest', tone: 'teal' as const },
    { id: 2, name: 'Tomato', variety: 'BARI Tomato 14', stage: 'Flowering', health: 'Needs attention', action: 'Inspect lower leaves', days: '42 days to harvest', tone: 'clay' as const },
    { id: 3, name: 'Mustard', variety: 'BARI Sarisha 17', stage: 'Seedling', health: 'Healthy', action: 'Thin seedlings this week', days: '91 days to harvest', tone: 'sun' as const },
    { id: 4, name: 'Aman rice', variety: 'BRRI dhan 75', stage: 'Transplanting', health: 'Healthy', action: 'Maintain shallow water', days: '84 days to harvest', tone: 'teal' as const },
  ]);
  const visible = crops.filter((crop) => filter === 'All' || crop.health === filter);
  const [newCrop, setNewCrop] = useState('');
  return <div><PageHeader language={language} eyebrow="Crop care planner" title="Read the field before it speaks." description="A clear working list for every plot, with the next useful action kept close." action={<button onClick={() => setShowAdd(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#1f5e4e] px-4 py-2.5 text-sm font-semibold text-[#fffbea] hover:-translate-y-0.5" data-testid="button-add-crop"><Plus size={16} /> Add crop</button>} />
    <div className="mb-5 flex items-center justify-between gap-3"><div className="flex gap-2 overflow-x-auto scrollbar-none">{['All', 'Healthy', 'Needs attention'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${filter === item ? 'bg-[#1f5e4e] text-white' : 'bg-[#e9ece3] text-[#6d8177]'}`} data-testid={`button-crop-filter-${item.toLowerCase().replace(' ', '-')}`}>{item === 'All' ? labels[language].all : item}</button>)}</div><span className="hidden text-xs text-[#899a92] sm:block">{visible.length} of {crops.length} plots</span></div>
    <div className="grid gap-4 md:grid-cols-2">{visible.length === 0 ? <Panel className="col-span-full p-10 text-center"><Wheat className="mx-auto mb-3 text-[#8da99a]" size={28} /><p className="font-semibold text-[#365f51]">No crops in this view</p></Panel> : visible.map((crop, index) => <Panel key={crop.id} className={`animate-rise-in delay-${(index % 4) + 1} overflow-hidden`}><div className="flex items-start justify-between gap-3 border-b border-[#e9e8de] p-5"><div className="flex gap-3"><IconBadge icon={crop.name === 'Mustard' ? Sprout : Wheat} tone={crop.tone} /><div><h2 className="font-display text-xl text-[#214d40]">{crop.name}</h2><p className="mt-1 text-xs text-[#83948c]">{crop.variety} · {crop.stage}</p></div></div><StatusPill tone={crop.health === 'Needs attention' ? 'clay' : 'teal'}>{crop.health}</StatusPill></div><div className="grid grid-cols-2 gap-4 p-5"><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#94a39c]">Next action</p><p className="mt-1 text-sm font-semibold text-[#395f52]">{crop.action}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#94a39c]">Crop calendar</p><p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[#395f52]"><CalendarDays size={14} className="text-[#9b7132]" />{crop.days}</p></div></div><div className="flex items-center justify-between bg-[#fafaf3] px-5 py-3"><span className="flex items-center gap-1.5 text-xs text-[#71847b]"><MapPin size={13} /> {index % 2 === 0 ? 'Block A · North plot' : 'Block B · Homestead'}</span><button className="flex items-center gap-1 text-xs font-bold text-[#397461] hover:text-[#1f5e4e]" data-testid={`button-view-crop-${crop.id}`}>View plan <ChevronRight size={14} /></button></div></Panel>)}</div>
    {showAdd && <div className="fixed inset-0 z-50 grid place-items-center bg-[#153b32]/40 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl bg-[#fffefa] p-5 shadow-xl"><div className="flex items-center justify-between"><h2 className="font-display text-2xl text-[#214d40]">Add a crop</h2><button onClick={() => setShowAdd(false)} className="p-1 text-[#789087]" data-testid="button-close-add-crop"><X size={18} /></button></div><p className="mt-1 text-sm text-[#7a8a83]">Start with the crop name; you can add the variety later.</p><input value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="mt-5 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-[#77a98d]" placeholder="e.g. Bottle gourd" data-testid="input-new-crop" /><button onClick={() => { if (newCrop.trim()) { setCrops((current) => [...current, { id: Date.now(), name: newCrop.trim(), variety: 'New field entry', stage: 'Planning', health: 'Healthy', action: 'Add first field note', days: 'Calendar not set', tone: 'teal' }]); setNewCrop(''); setShowAdd(false); } }} className="mt-4 w-full rounded-xl bg-[#1f5e4e] py-3 text-sm font-bold text-white" data-testid="button-save-new-crop">Add to crop planner</button></div></div>}
  </div>;
}

function Livestock({ language }: { language: Language }) {
  const [filter, setFilter] = useState('All');
  const animals = [
    { type: 'Dairy cattle', local: 'গরু', count: 6, health: 'Good', next: 'FMD vaccination · 20 Jun', icon: Tractor, tone: 'teal' as const },
    { type: 'Goats', local: 'ছাগল', count: 9, health: 'Good', next: 'Deworming · 24 Jun', icon: Activity, tone: 'sun' as const },
    { type: 'Chickens', local: 'মুরগি', count: 3, health: 'Watch', next: 'Observe feed intake · Today', icon: Sprout, tone: 'clay' as const },
  ];
  const visible = animals.filter((a) => filter === 'All' || (filter === 'Watch' ? a.health === 'Watch' : a.health === 'Good'));
  return <div><PageHeader language={language} eyebrow="Livestock health" title="Steady care, one check at a time." description="Keep routine checks visible and small concerns from becoming expensive ones." action={<button onClick={() => setFilter(filter === 'Watch' ? 'All' : 'Watch')} className="flex items-center justify-center gap-2 rounded-xl border border-[#cddbd1] bg-[#fffefa] px-4 py-2.5 text-sm font-semibold text-[#356554] hover:bg-[#edf4ed]" data-testid="button-toggle-livestock-watch"><AlertTriangle size={16} /> {filter === 'Watch' ? 'Show all animals' : 'Show watch list'}</button>} /><div className="grid gap-4 md:grid-cols-3">{visible.map((animal, index) => <Panel key={animal.type} className={`animate-rise-in delay-${index + 1} p-5`} data-testid={`card-livestock-${animal.type.toLowerCase().replace(' ', '-')}`}><div className="flex items-start justify-between"><IconBadge icon={animal.icon} tone={animal.tone} /><StatusPill tone={animal.health === 'Watch' ? 'clay' : 'teal'}>{animal.health}</StatusPill></div><h2 className="mt-5 font-display text-2xl text-[#214d40]">{animal.type}</h2><p className="mt-1 font-bangla text-xs text-[#84958c]">{animal.local}</p><div className="mt-6 flex items-end justify-between"><div><strong className="font-display text-4xl text-[#2c6353]">{animal.count}</strong><span className="ml-1 text-xs text-[#83948c]">animals</span></div><div className="text-right"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#94a39c]">Next check</p><p className="mt-1 max-w-[130px] text-xs font-semibold leading-5 text-[#506f64]">{animal.next}</p></div></div><button onClick={() => setFilter('All')} className="mt-6 flex w-full items-center justify-center gap-1 rounded-xl bg-[#f2f4eb] py-2.5 text-xs font-bold text-[#477668] hover:bg-[#e6eee6]" data-testid={`button-open-livestock-${index}`}>Open care record <ChevronRight size={14} /></button></Panel>)}</div><Panel className="mt-6 overflow-hidden"><div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"><div><div className="flex items-center gap-2 text-[#397461]"><ShieldCheck size={17} /><span className="text-xs font-bold uppercase tracking-[.13em]">Herd note</span></div><h2 className="mt-2 font-display text-xl text-[#214d40]">Clean water is the quiet intervention.</h2><p className="mt-1 max-w-xl text-sm leading-6 text-[#74867e]">Keep a separate bucket for calves and refresh drinking water before the hottest part of the afternoon.</p></div><div className="rounded-xl bg-[#f9e8b4] px-4 py-3 text-center"><p className="text-2xl font-semibold text-[#795d1e]">06:30</p><p className="text-[11px] font-semibold text-[#91752e]">next morning round</p></div></div></Panel></div>;
}

function Fisheries({ language }: { language: Language }) {
  const [ponds, setPonds] = useState([{ id: 1, pond: 'Pond 01', species: 'Rui · Catla', water: 'Balanced', ph: '7.2', temp: '28.4°C', risk: 'Low', tone: 'teal' as const }, { id: 2, pond: 'Pond 02', species: 'Tilapia', water: 'Needs testing', ph: '6.5', temp: '29.1°C', risk: 'Moderate', tone: 'sun' as const }]);
  const [selected, setSelected] = useState(2);
  const pond = ponds.find((item) => item.id === selected) ?? ponds[0];
  return <div><PageHeader language={language} eyebrow="Fisheries pond health" title="Water first. Fish follow." description="A simple rhythm for water quality, feed, and early risk signals." action={<button onClick={() => setPonds((current) => current.map((p) => p.id === selected ? { ...p, water: 'Balanced', risk: 'Low', tone: 'teal' } : p))} className="flex items-center justify-center gap-2 rounded-xl bg-[#1f5e4e] px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5" data-testid="button-record-water-check"><RefreshCw size={16} /> Record water check</button>} /><div className="mb-5 flex gap-2 overflow-x-auto scrollbar-none">{ponds.map((p) => <button key={p.id} onClick={() => setSelected(p.id)} className={`shrink-0 rounded-xl border px-4 py-2.5 text-left ${selected === p.id ? 'border-[#5e9b82] bg-[#e4f0e8]' : 'border-[#dfe1d7] bg-[#fffefa]'}`} data-testid={`button-select-pond-${p.id}`}><span className="block text-sm font-bold text-[#356554]">{p.pond}</span><span className="mt-0.5 block text-[11px] text-[#7d9187]">{p.species}</span></button>)}</div><div className="grid gap-5 xl:grid-cols-[1fr_1.25fr]"><Panel className="p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#9a7130]">Selected pond</p><h2 className="mt-2 font-display text-3xl text-[#214d40]">{pond.pond}</h2><p className="mt-1 text-sm text-[#82948b]">{pond.species}</p></div><IconBadge icon={Waves} tone="water" /></div><div className="mt-8 flex items-center gap-5"><div className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full border-[10px] border-[#d9edf0] bg-[#f3faf9] before:absolute before:inset-1.5 before:rounded-full before:border-2 before:border-dashed before:border-[#74b2b6]"><div className="text-center"><strong className="font-display text-3xl text-[#277682]">{pond.risk === 'Low' ? '86' : '64'}</strong><span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#6c999b]">health score</span></div></div><div><StatusPill tone={pond.tone}>{pond.water}</StatusPill><p className="mt-3 text-sm leading-6 text-[#6e837a]">{pond.risk === 'Low' ? 'Conditions are steady. Keep the current feed rhythm.' : 'Test pH and dissolved oxygen before the next feed.'}</p></div></div><div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#f4f7f1] p-3"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#94a39c]">pH level</p><p className="mt-1 font-display text-2xl text-[#356554]">{pond.ph}</p></div><div className="rounded-xl bg-[#f4f7f1] p-3"><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#94a39c]">Water temp</p><p className="mt-1 font-display text-2xl text-[#356554]">{pond.temp}</p></div></div></Panel><Panel className="overflow-hidden"><div className="border-b border-[#e8e7dc] px-5 py-4"><h2 className="font-display text-xl text-[#214d40]">Pond routine</h2><p className="mt-1 text-xs text-[#82928b]">What to look for on the next visit</p></div><div className="divide-y divide-[#ecebe2]">{[{ icon: Droplets, title: 'Water clarity', detail: 'Visibility should reach 25–35 cm', state: pond.risk === 'Low' ? 'On track' : 'Check today' }, { icon: Thermometer, title: 'Temperature', detail: 'Keep feeding lighter above 30°C', state: 'On track' }, { icon: Fish, title: 'Surface behaviour', detail: 'Watch for fish gasping at dawn', state: 'Observe' }].map((item, i) => <div key={item.title} className="flex items-center gap-3 px-5 py-4" data-testid={`row-pond-routine-${i}`}><IconBadge icon={item.icon} tone={i === 0 && pond.risk !== 'Low' ? 'sun' : 'water'} /><div className="flex-1"><p className="text-sm font-semibold text-[#3e6357]">{item.title}</p><p className="mt-1 text-xs text-[#84958c]">{item.detail}</p></div><StatusPill tone={item.state === 'Check today' ? 'sun' : 'teal'}>{item.state}</StatusPill></div>)}</div></Panel></div></div>;
}

function Market({ language }: { language: Language }) {
  const [market, setMarket] = useState('All markets');
  const [watched, setWatched] = useState<string[]>(['Aman paddy']);
  const quotes = [{ commodity: 'Aman paddy', market: 'Mymensingh Sadar', price: '৳ 1,280', unit: '/ maund', delta: '+4.8%', up: true, note: 'Strong local demand' }, { commodity: 'Tomato', market: 'Kewatkhali haat', price: '৳ 42', unit: '/ kg', delta: '-6.2%', up: false, note: 'More supply this week' }, { commodity: 'Mustard seed', market: 'Rangpur city', price: '৳ 6,140', unit: '/ maund', delta: '+2.1%', up: true, note: 'Stable buyer interest' }, { commodity: 'Tilapia', market: 'Mymensingh Sadar', price: '৳ 218', unit: '/ kg', delta: '+3.4%', up: true, note: 'Festival buying begins' }];
  const markets = ['All markets', 'Mymensingh Sadar', 'Kewatkhali haat', 'Rangpur city'];
  const visible = quotes.filter((q) => market === 'All markets' || q.market === market);
  return <div><PageHeader language={language} eyebrow="Local market intelligence" title="Know the going rate before you go." description="Indicative wholesale quotes from nearby haats, so your next decision starts with context." action={<div className="flex items-center gap-2 rounded-xl border border-[#dfe1d7] bg-[#fffefa] px-3 py-2 text-xs text-[#71847b]"><CalendarDays size={15} /> Updated 18 Jun, 08:10</div>} /><div className="mb-5 flex gap-2 overflow-x-auto scrollbar-none">{markets.map((item) => <button key={item} onClick={() => setMarket(item)} className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ${market === item ? 'bg-[#1f5e4e] text-white' : 'bg-[#e9ece3] text-[#6d8177]'}`} data-testid={`button-market-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div><Panel className="overflow-hidden"><div className="hidden grid-cols-[1.4fr_1fr_.8fr_.7fr_40px] gap-4 border-b border-[#e8e7dc] bg-[#fafaf3] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#94a39c] sm:grid"><span>Commodity</span><span>Market</span><span>Today</span><span>Move</span><span /></div>{visible.map((quote) => <div key={quote.commodity} className="grid gap-3 border-b border-[#ecebe2] px-5 py-4 last:border-0 sm:grid-cols-[1.4fr_1fr_.8fr_.7fr_40px] sm:items-center sm:gap-4" data-testid={`row-market-${quote.commodity.replace(' ', '-').toLowerCase()}`}><div><div className="flex items-center gap-2"><h2 className="text-sm font-semibold text-[#355d50]">{quote.commodity}</h2>{watched.includes(quote.commodity) && <StatusPill tone="sun">Watching</StatusPill>}</div><p className="mt-1 text-xs text-[#899992]">{quote.note}</p></div><p className="text-xs text-[#71847b]"><span className="mr-1 text-[10px] font-bold uppercase text-[#a1ada7] sm:hidden">Market ·</span>{quote.market}</p><p className="font-display text-xl text-[#2f6352]">{quote.price}<span className="ml-1 text-[11px] font-sans text-[#93a19b]">{quote.unit}</span></p><p className={`flex items-center gap-1 text-xs font-bold ${quote.up ? 'text-[#398268]' : 'text-[#b35b45]'}`}>{quote.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{quote.delta}</p><button onClick={() => setWatched((current) => current.includes(quote.commodity) ? current.filter((item) => item !== quote.commodity) : [...current, quote.commodity])} className="text-xs font-bold text-[#73887d] hover:text-[#9b7132]" data-testid={`button-watch-${quote.commodity.replace(' ', '-').toLowerCase()}`}>{watched.includes(quote.commodity) ? 'Unwatch' : 'Watch'}</button></div>)}</Panel><div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#e4d9ae] bg-[#fbf2d3] p-4"><InfoIcon /><p className="text-xs leading-5 text-[#75622f]"><strong>Trading note:</strong> Prices are indicative and can vary by quality, volume, and arrival time. Ask the buyer about grading before committing.</p></div></div>;
}

function InfoIcon() { return <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#f3dfa1] text-[#8a681c]"><Search size={15} /></span>; }

function Assistant({ language }: { language: Language }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Good morning, Rahim. I can help with your Aman rice, tomato plots, ponds, or livestock. What are you seeing in the field today?', time: '08:12' }]);
  const suggestions = ['Tomato leaves are curling', 'When should I feed Pond 02?', 'Best time to sell Aman paddy'];
  const respond = (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    const reply = clean.toLowerCase().includes('tomato') ? 'Check the underside of the leaves first. Curling with sticky residue can indicate whitefly; remove badly affected leaves, avoid excess nitrogen, and inspect again tomorrow morning.' : clean.toLowerCase().includes('pond') || clean.toLowerCase().includes('feed') ? 'For Pond 02, test pH before feeding. At 6.5, give a lighter feed and add fresh water if possible. Avoid feeding when fish are coming to the surface for air.' : clean.toLowerCase().includes('sell') || clean.toLowerCase().includes('paddy') ? 'Aman paddy is around ৳ 1,280 per maund in Mymensingh Sadar today, up 4.8%. Check grain moisture and ask two buyers before deciding.' : 'Start with a close look at the affected area and note the time, weather, and recent treatment. I would compare that with your crop record before recommending a change.';
    setMessages((current) => [...current, { role: 'user', text: clean, time: 'Now' }, { role: 'assistant', text: reply, time: 'Now' }]);
    setPrompt('');
  };
  return <div className="mx-auto max-w-4xl"><PageHeader language={language} eyebrow="FarmCare AI · field assistant" title="A second pair of eyes in your pocket." description="Ask in plain language. Get practical next steps grounded in Bangladesh growing conditions." action={<div className="flex items-center gap-2 rounded-full bg-[#e3f0e7] px-3 py-2 text-xs font-semibold text-[#34715e]"><span className="h-2 w-2 rounded-full bg-[#4f9a78] animate-pulse-soft" /> Online · local guidance</div>} /><Panel className="overflow-hidden"><div className="flex items-center gap-3 border-b border-[#e8e7dc] bg-[#fafaf3] px-5 py-4"><IconBadge icon={Sprout} tone="teal" /><div><p className="text-sm font-bold text-[#355d50]">FarmCare assistant</p><p className="text-xs text-[#899992]">Practical answers, no complicated language</p></div><ShieldCheck className="ml-auto text-[#4f8e70]" size={19} /></div><div className="min-h-[360px] space-y-5 bg-[#fdfcf7] p-5 sm:p-7">{messages.map((message, index) => <div key={`${message.time}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`} data-testid={`assistant-message-${index}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${message.role === 'assistant' ? 'bg-[#dcece6] text-[#276957]' : 'bg-[#f5e5b2] text-[#87661c]'}`}>{message.role === 'assistant' ? <Sprout size={15} /> : 'RH'}</span><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'assistant' ? 'rounded-tl-sm bg-[#edf4ed] text-[#47695c]' : 'rounded-tr-sm bg-[#1f5e4e] text-[#f6f1df]'}`}><p>{message.text}</p><p className={`mt-1 text-[10px] ${message.role === 'assistant' ? 'text-[#8aa399]' : 'text-[#b8d2c5]'}`}>{message.time}</p></div></div>)}</div><div className="border-t border-[#e8e7dc] p-4 sm:p-5"><div className="mb-3 flex gap-2 overflow-x-auto scrollbar-none">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => respond(suggestion)} className="shrink-0 rounded-full border border-[#d6e3d7] bg-[#f7faf4] px-3 py-2 text-xs font-medium text-[#527567] hover:border-[#8db69a]" data-testid={`button-suggestion-${suggestion.slice(0, 8).replace(' ', '-').toLowerCase()}`}>{suggestion}</button>)}</div><div className="flex items-end gap-2 rounded-2xl border border-[#d8ded5] bg-[#fffefa] p-2 focus-within:ring-2 focus-within:ring-[#b7d3bd]"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); respond(prompt); } }} rows={2} placeholder={language === 'bn' ? 'আপনার মাঠের প্রশ্ন লিখুন...' : 'Describe what you are seeing in the field...'} className="min-h-[48px] flex-1 resize-none border-0 bg-transparent px-2 py-1.5 text-sm text-[#365b4e] outline-none placeholder:text-[#9aaba2]" data-testid="input-assistant-prompt" /><button onClick={() => respond(prompt)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5c95a] text-[#183d33] hover:bg-[#eabe4d]" aria-label="Send message" data-testid="button-submit-assistant"><Send size={17} /></button></div><p className="mt-3 text-center text-[10px] text-[#9eaaa4]">FarmCare provides guidance, not a substitute for a local agriculture officer.</p></div></Panel></div>;
}

function SettingsPage({ language, onLanguage }: { language: Language; onLanguage: () => void }) {
  const [saved, setSaved] = useState(false);
  const [district, setDistrict] = useState('Mymensingh');
  const [upazila, setUpazila] = useState('Bhaluka');
  const [size, setSize] = useState('4.8');
  const [season, setSeason] = useState('Kharif-2 · Aman');
  return <div className="mx-auto max-w-4xl"><PageHeader language={language} eyebrow="Profile & farm settings" title="Make FarmCare fit your farm." description="Keep your location and season current so field guidance stays relevant." action={<button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2200); }} className="flex items-center justify-center gap-2 rounded-xl bg-[#1f5e4e] px-4 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5" data-testid="button-save-settings"><Save size={16} /> {saved ? 'Saved' : labels[language].save}</button>} /><div className="grid gap-5 md:grid-cols-[.8fr_1.2fr]"><Panel className="p-5 sm:p-6"><div className="flex items-center gap-3"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#d5e5d4] text-lg font-bold text-[#28594c]">RH</span><div><h2 className="font-display text-xl text-[#214d40]">Rahim Hossain</h2><p className="mt-1 text-xs text-[#84958c]">Smallholder farmer · Member since 2023</p></div></div><div className="mt-7 space-y-3"><button onClick={onLanguage} className="flex w-full items-center justify-between rounded-xl bg-[#f4f6ee] px-3.5 py-3 text-left hover:bg-[#ebf1e8]" data-testid="button-language-settings"><span className="flex items-center gap-2 text-sm font-semibold text-[#45665a]"><MessageCircle size={16} /> Language</span><span className="text-xs font-bold text-[#9a7130]">{language === 'en' ? 'English / বাংলা' : 'বাংলা / English'}</span></button><div className="flex items-center justify-between rounded-xl bg-[#f4f6ee] px-3.5 py-3"><span className="flex items-center gap-2 text-sm font-semibold text-[#45665a]"><Bell size={16} /> Field reminders</span><span className="h-5 w-9 rounded-full bg-[#4d9275] p-0.5"><span className="block h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm" /></span></div></div></Panel><Panel className="p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><IconBadge icon={MapPin} tone="sun" /><div><h2 className="font-display text-xl text-[#214d40]">Farm location</h2><p className="text-xs text-[#84958c]">Used for local weather and market context</p></div></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-[#567267]">District<select value={district} onChange={(e) => setDistrict(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm font-normal text-[#3a5e52] outline-none focus:ring-2 focus:ring-[#b7d3bd]" data-testid="select-district"><option>Mymensingh</option><option>Rangpur</option><option>Rajshahi</option><option>Jashore</option></select></label><label className="text-xs font-bold text-[#567267]">Upazila<select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm font-normal text-[#3a5e52] outline-none focus:ring-2 focus:ring-[#b7d3bd]" data-testid="select-upazila"><option>Bhaluka</option><option>Trishal</option><option>Phulpur</option><option>Gangachara</option></select></label></div><div className="my-6 h-px bg-[#e8e7dc]" /><div className="mb-5 flex items-center gap-2"><IconBadge icon={Wheat} tone="teal" /><div><h2 className="font-display text-xl text-[#214d40]">Farm profile</h2><p className="text-xs text-[#84958c]">The basics behind your recommendations</p></div></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-[#567267]">Total land size<input value={size} onChange={(e) => setSize(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm font-normal text-[#3a5e52] outline-none focus:ring-2 focus:ring-[#b7d3bd]" data-testid="input-land-size" /><span className="mt-1 block text-[10px] font-normal text-[#95a39d]">acres</span></label><label className="text-xs font-bold text-[#567267]">Current season<select value={season} onChange={(e) => setSeason(e.target.value)} className="mt-2 w-full rounded-xl border border-[#d8ded5] bg-[#fafbf5] px-3 py-3 text-sm font-normal text-[#3a5e52] outline-none focus:ring-2 focus:ring-[#b7d3bd]" data-testid="select-season"><option>Kharif-2 · Aman</option><option>Rabi · Mustard</option><option>Kharif-1 · Aus</option></select></label></div></Panel></div><div className="mt-5 flex items-center gap-2 text-xs text-[#84958c]"><ShieldCheck size={15} className="text-[#4d9275]" /> Your farm profile is stored on this device for the demo.</div></div>;
}

function RoutedErrorBoundary({ children, resetKey }: { children: ReactNode; resetKey: string }) {
  return <ErrorBoundary resetKey={resetKey}>{children}</ErrorBoundary>;
}

function Router({ language, alerts, onDismiss, onLanguage }: { language: Language; alerts: AlertItem[]; onDismiss: (id: number) => void; onLanguage: () => void }) {
  const [location] = useLocation();
  return <RoutedErrorBoundary resetKey={location}><Shell language={language} onLanguage={onLanguage}><Switch><Route path="/"><Overview language={language} alerts={alerts} onDismiss={onDismiss} onLanguage={onLanguage} /></Route><Route path="/crops"><Crops language={language} /></Route><Route path="/livestock"><Livestock language={language} /></Route><Route path="/fisheries"><Fisheries language={language} /></Route><Route path="/market"><Market language={language} /></Route><Route path="/assistant"><Assistant language={language} /></Route><Route path="/settings"><SettingsPage language={language} onLanguage={onLanguage} /></Route><Route component={NotFound} /></Switch></Shell></RoutedErrorBoundary>;
}

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [alerts, setAlerts] = useState<AlertItem[]>(seededAlerts);
  const toggleLanguage = () => setLanguage((current) => current === 'en' ? 'bn' : 'en');
  const dismiss = (id: number) => setAlerts((current) => current.filter((alert) => alert.id !== id));
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router language={language} alerts={alerts} onDismiss={dismiss} onLanguage={toggleLanguage} /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;