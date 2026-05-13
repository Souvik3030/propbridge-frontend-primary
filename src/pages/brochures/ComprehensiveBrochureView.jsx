import React, { useEffect, useState } from 'react';
import { 
  Download, Share2, Mail, Link as LinkIcon, 
  Copy, X, MapPin, Home, Maximize2, 
  Calendar, DollarSign, PieChart, Info, 
  Layers, CheckCircle2, ChevronRight,
  Printer, MessageSquare, Phone, Building2,
  Globe, ShieldCheck, Heart, Zap, BookOpen,
  Anchor, BarChart3, Calculator, Camera, Map
} from 'lucide-react';

const Page = ({ children, pageNumber, totalPages = 8, theme = "light" }) => (
  <div className={`relative w-full max-w-[1000px] mx-auto min-h-[1414px] shadow-2xl mb-12 overflow-hidden flex flex-col ${
    theme === 'dark' ? 'bg-[#0a0d18] text-white' : 'bg-white text-slate-900 border border-gray-100'
  }`}>
    {/* Page Header Branded */}
    <div className={`p-8 pb-4 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em] ${
      theme === 'dark' ? 'text-white/40' : 'text-slate-300'
    }`}>
      <span>VortexWeb</span>
      <span>March 2026</span>
    </div>

    {/* Content Area */}
    <div className="flex-1 px-12 py-4">
      {children}
    </div>

    {/* Page Footer Branded */}
    <div className={`p-8 pt-4 border-t flex items-center justify-between text-[10px] font-black uppercase tracking-widest ${
      theme === 'dark' ? 'border-white/5 text-white/40' : 'border-gray-50 text-slate-400'
    }`}>
      <span>VortexWeb · Exclusive Property Intelligence</span>
      <span>Page {pageNumber} of {totalPages}</span>
      <span>Confidential Investment Dossier</span>
    </div>
  </div>
);

const MetricBox = ({ label, value, icon: Icon, color = "text-[#ccab59]" }) => (
  <div className="flex flex-col items-center justify-center p-4 border-r border-[#ffffff10] last:border-0">
    <div className={`text-[17px] font-black ${color} mb-1 transition-all`}>{value || '—'}</div>
    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
  </div>
);

const DetailBox = ({ label, value, icon: Icon }) => (
  <div className="bg-[#fcfaf5] dark:bg-slate-800/20 p-3 rounded-xl flex items-center gap-3 border border-[#ece7d9] dark:border-slate-800/50">
    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-[#ece7d9]/50 dark:border-slate-700">
      <Icon className="text-[#ccab59]" size={14} />
    </div>
    <div>
      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-[11px] font-black text-slate-800 dark:text-white truncate">{value}</div>
    </div>
  </div>
);

export default function ComprehensiveBrochureView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('lastGeneratedBrochure');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) { console.error(e); }
    }
  }, []);

  const defaults = {
    title: "Salva",
    developer: "Emaar",
    community: "The Heights Country Club and Wellness",
    location: "The Heights Country Club and Wellness, Dubai",
    type: "Villas",
    beds: "3",
    size: "3,340 sq.ft.",
    price: "AED 6,759,888",
    handover: "30 Jul 2030",
    paymentOption: "Payment Plan",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    amenities: [
      "Private Garden", "Covered Parking", "Swimming Pool", "Gym", 
      "Kids Play Area", "BBQ Area", "24/7 Security", "Landscaped Parks", 
      "Walking Trails", "Community Center"
    ],
    schedule: [
      { label: "Down Payment", percent: "10%", amount: "AED 675,989" },
      { label: "Pre-Handover", percent: "70%", amount: "AED 4,731,922" },
      { label: "On Handover", percent: "20%", amount: "AED 1,351,978" }
    ]
  };

  const b = data ? { ...defaults, ...data } : defaults;

  return (
    <div className="min-h-screen bg-[#f1f1f1] py-12 px-6">
      
      {/* TOOLBAR (Fixed) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-fit bg-[#0f172a] rounded-2xl shadow-2xl p-2 flex items-center justify-center gap-2 border border-white/5 overflow-x-auto no-scrollbar no-print">
         <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-[#ccab59] text-white rounded-xl text-xs font-black hover:bg-[#b0934c] transition-all">
           <Download size={14} /> Download PDF Dossier
         </button>
         <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white/60 rounded-xl text-xs font-black hover:bg-white/10 transition-all">
           <MessageSquare size={14} /> WhatsApp
         </button>
         <div className="w-px h-6 bg-white/10 mx-2" />
         <button onClick={() => window.close()} className="p-2.5 text-white/40 hover:text-white transition-colors">
            <X size={18} />
         </button>
      </div>

      {/* ── PAGE 1: COVER ── */}
      <Page pageNumber={1} theme="dark">
        <div className="flex flex-col items-center justify-between h-full py-12">
          
          {/* Top Info Grid */}
          <div className="w-full grid grid-cols-5 gap-4">
             {[
               { icon: Building2, label: "Developer", val: b.developer },
               { icon: Calendar, label: "Handover", val: b.handover },
               { icon: DollarSign, label: "From", val: b.price },
               { icon: Calculator, label: "EMI From", val: "AED 30,059/mo" },
               { icon: BarChart3, label: "Score", val: "25/100" }
             ].map((item, i) => (
               <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                 <item.icon size={16} className="text-[#ccab59] mx-auto mb-2" />
                 <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                 <div className="text-[11px] font-black text-white">{item.val}</div>
               </div>
             ))}
          </div>

          {/* Centerpiece */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-[12px] font-black text-[#ccab59] tracking-[0.5em] uppercase mb-16">
               Investment Dossier
            </div>
            <h1 className="text-[120px] font-serif font-black text-white leading-none mb-4 tracking-tighter drop-shadow-2xl">
              {b.title}
            </h1>
            <div className="text-[24px] font-bold text-white/50 mb-8 lowercase italic">
               by <span className="text-[#ccab59] font-black uppercase not-italic">{b.developer}</span>
            </div>
            <div className="flex items-center gap-2 text-[#ccab59]/60 font-black text-[12px] uppercase tracking-[0.3em]">
               <MapPin size={16} /> {b.community}
            </div>
          </div>

          {/* Bottom Metrics */}
          <div className="w-full border-t border-white/5 grid grid-cols-5 pt-8">
             <MetricBox label="Est. Yield" value="—" />
             <MetricBox label="Price (AED)" value={b.price?.replace('AED ', '')} />
             <MetricBox label="Bedrooms" value={b.beds} />
             <MetricBox label="Area (sq.ft.)" value={b.size?.replace(' sq.ft.', '')} />
             <MetricBox label="Score" value="25/100" color="text-emerald-500" />
          </div>

        </div>
        
        {/* Absolute Background Component */}
        <img 
          src={b.image} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
          alt="Overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent -z-10" />
      </Page>

      {/* ── PAGE 2: GALLERY & DETAILS ── */}
      <Page pageNumber={2}>
        <div className="space-y-8">
           <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-gray-100" />
              <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                 <span className="text-[#ccab59]">◆</span> Property Gallery <span className="text-[#ccab59]">◆</span>
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
           </div>

           <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 h-[450px]">
              <img src={b.image} className="w-full h-full object-cover" alt="Property" />
           </div>

           <p className="text-[13px] text-slate-500 leading-relaxed text-center italic max-w-3xl mx-auto">
             {b.title} by {b.developer} in the prestigious {b.community} community. 
             {b.type} offers {b.size} of premium living space with {b.beds} bedroom configurations ({b.beds} BR available). 
             Expected handover: {b.handover}. Starting at AED 2,024/sqft.
           </p>

           <div className="grid grid-cols-4 gap-3">
              <DetailBox label="Type" value={b.type} icon={Home} />
              <DetailBox label="Beds" value={`${b.beds} avail`} icon={Layers} />
              <DetailBox label="Area" value={b.size} icon={Maximize2} />
              <DetailBox label="Price" value={b.price} icon={DollarSign} />
              <DetailBox label="Location" value={b.location.split(',')[0]} icon={MapPin} />
              <DetailBox label="Developer" value={b.developer} icon={Building2} />
              <DetailBox label="Handover" value={b.handover} icon={Calendar} />
              <DetailBox label="Status" value="Payment Plan" icon={Zap} />
              <DetailBox label="Purpose" value="For Sale" icon={Zap} />
              <DetailBox label="Units Listed" value="189" icon={Building2} />
              <DetailBox label="Start" value="—" icon={Calendar} />
              <DetailBox label="Invest Score" value="25/100" icon={BarChart3} />
           </div>

           <div>
              <h3 className="text-[10px] font-black text-[#ccab59] uppercase tracking-widest mb-4">Amenities & Facilities</h3>
              <div className="flex flex-wrap gap-2">
                 {b.amenities.map((item, i) => (
                   <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600">
                      <CheckCircle2 size={12} className="text-emerald-500" /> {item}
                   </span>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-4 gap-4">
              {[
                { label: "EMI (60%)", val: "AED 30,059/mo", icon: Calculator },
                { label: "Total Costs", val: "AED 427,232", icon: WalletIcon },
                { label: "Grand Total", val: "AED 7,187,120", icon: Calculator },
                { label: "Payment", val: b.paymentOption, icon: WalletIcon }
              ].map((item, i) => (
                <div key={i} className="bg-[#fcfaf5] p-5 rounded-2xl border border-[#ece7d9] text-center shadow-lg shadow-amber-900/5">
                   <item.icon size={18} className="text-[#ccab59] mx-auto mb-3" />
                   <div className="text-[14px] font-black text-slate-900 mb-1">{item.val}</div>
                   <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
           </div>
        </div>
      </Page>

      {/* ── PAGE 3: COST BREAKDOWN ── */}
      <Page pageNumber={3}>
        <div className="space-y-12">
           <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-gray-100" />
              <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                 <span className="text-[#ccab59]">◆</span> Cost Breakdown <span className="text-[#ccab59]">◆</span>
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
           </div>

           <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
              <table className="w-full">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-gray-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <th className="px-8 py-5 text-left">Cost Item</th>
                       <th className="px-8 py-5 text-left">Rate / Details</th>
                       <th className="px-8 py-5 text-right">Amount (AED)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                    {[
                      { item: "Property Purchase Price", rate: "Base selling price", val: b.price },
                      { item: "DLD Registration Fee", rate: "4% of purchase price", val: "AED 270,396" },
                      { item: "Agent Commission", rate: "2.1% of purchase price", val: "AED 141,958" },
                      { item: "VAT on Commission", rate: "5% of commission", val: "AED 7,098" },
                      { item: "Trustee Fee", rate: "Fixed charge", val: "AED 4,000" },
                      { item: "Conveyancing Fee", rate: "Legal processing", val: "AED 3,200" },
                      { item: "Admin Fee", rate: "DLD admin charge", val: "AED 580" },
                      { item: "NOC Fee", rate: "Developer clearance", val: "AED 1,000 - 5,000*" },
                      { item: "Title Deed Fee", rate: "Oqood / Title issuance", val: "AED 2,100*" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-4 text-[13px] font-black text-slate-800">{row.item}</td>
                        <td className="px-8 py-4 text-[12px] font-bold text-slate-400">{row.rate}</td>
                        <td className="px-8 py-4 text-[13px] font-black text-slate-900 text-right">{row.val}</td>
                      </tr>
                    ))}
                 </tbody>
                 <tfoot>
                    <tr className="bg-[#fcfaf5] border-t-2 border-[#ccab59]/20">
                       <td colSpan={2} className="px-8 py-6 text-[15px] font-black text-[#ccab59] uppercase tracking-[0.2em]">Total Investment Required</td>
                       <td className="px-8 py-6 text-[18px] font-black text-[#ccab59] text-right">AED 7,187,120</td>
                    </tr>
                 </tfoot>
              </table>
           </div>
           <div className="text-[9px] font-bold text-slate-400 italic px-4">* NOC and Title Deed fees vary by developer. Amounts are estimates.</div>

           <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#fdfaf3] p-10 rounded-[2.5rem] border border-[#ece7d9] text-center">
                 <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Property Price</div>
                 <div className="text-[32px] font-serif font-black text-[#ccab59] mb-1">{b.price}</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase">AED 2,024 per sq.ft.</div>
              </div>
              <div className="bg-[#fdfaf3] p-10 rounded-[2.5rem] border border-[#ece7d9] text-center">
                 <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Additional Costs</div>
                 <div className="text-[32px] font-serif font-black text-amber-700/80 mb-1">AED 427,232</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase">6.3% of purchase price</div>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Quick Mortgage Preview</h3>
              <div className="grid grid-cols-4 gap-4">
                 {[
                   { label: "Min Down (Expats)", val: "20%" },
                   { label: "Down Payment", val: "AED 1,351,978" },
                   { label: "Monthly EMI (60%)", val: "AED 30,059" },
                   { label: "Max Loan Term", val: "25 Yrs" }
                 ].map((item, i) => (
                   <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                      <div className="text-[16px] font-black text-slate-900 mb-1">{item.val}</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </Page>

      {/* ── PAGE 4: PAYMENT STRUCTURE (DARK) ── */}
      <Page pageNumber={4} theme="dark">
        <div className="space-y-12">
           <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-[12px] font-black text-[#ccab59] uppercase tracking-[0.5em] flex items-center gap-3">
                <span>◆</span> Payment Structure <span>◆</span>
              </h2>
              <div className="h-px flex-1 bg-white/10" />
           </div>

           <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Community", val: b.community },
                { label: "Unit Type", val: b.type },
                { label: "Handover", val: b.handover },
                { label: "Selling Price", val: b.price },
                { label: "Payment Option", val: b.paymentOption },
                { label: "Already Paid", val: "100%" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                   <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
                   <div className="text-[14px] font-black text-white">{item.val}</div>
                </div>
              ))}
           </div>

           <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="px-8 py-5 text-left">#</th>
                    <th className="px-8 py-5 text-left">Milestone / Due Date</th>
                    <th className="px-8 py-5 text-center">%</th>
                    <th className="px-8 py-5 text-right">Amount (AED)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {b.schedule.map((row, i) => (
                     <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-5 text-[12px] font-black text-[#ccab59]">{i+1}</td>
                        <td className="px-8 py-5 text-[12px] font-black text-white/90">{row.label}</td>
                        <td className="px-8 py-5 text-[13px] font-black text-white text-center">{row.percent}</td>
                        <td className="px-8 py-5 text-[13px] font-black text-[#ccab59] text-right">{row.amount}</td>
                     </tr>
                   ))}
                </tbody>
                <tfoot>
                  <tr className="bg-white/5">
                    <td colSpan={2} className="px-8 py-6 text-[14px] font-black text-white italic">Grand Total</td>
                    <td className="px-8 py-6 text-[14px] font-black text-white text-center">100%</td>
                    <td className="px-8 py-6 text-[16px] font-black text-[#ccab59] text-right">{b.price}</td>
                  </tr>
                </tfoot>
              </table>
           </div>

           <div>
              <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">Payment Timeline</h3>
              <div className="h-8 w-full bg-white/5 rounded-lg overflow-hidden flex shadow-inner">
                 <div className="bg-[#ccab59] flex items-center justify-center text-[10px] font-black text-black" style={{width: '10%'}}>10%</div>
                 <div className="bg-blue-400/60 flex items-center justify-center text-[10px] font-black text-white" style={{width: '70%'}}>70%</div>
                 <div className="bg-purple-400/60 flex items-center justify-center text-[10px] font-black text-white" style={{width: '20%'}}>20%</div>
              </div>
              <div className="flex justify-between text-[8px] font-bold text-slate-500 mt-2 uppercase tracking-widest px-1">
                 <span>Down Payment</span>
                 <span className="text-center">Pre-Handover</span>
                 <span>On Handover</span>
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] text-center">Why Dubai Real Estate?</h3>
              <div className="grid grid-cols-3 gap-4">
                 {[
                   { icon: Globe, label: "Tax-Free", desc: "0% income & capital gains tax" },
                   { icon: BarChart3, label: "Growing", desc: "Consistent market growth & demand" },
                   { icon: ShieldCheck, label: "RERA Regulated", desc: "Transparent investor protection" },
                   { icon: Anchor, label: "Global Hub", desc: "260+ destinations, 3.5M expat pop." },
                   { icon: Building2, label: "Vision 2040", desc: "Infrastructure & livability investment" },
                   { icon: Heart, label: "Golden Visa", desc: "AED 2M+ = 10-year residency" }
                 ].map((item, i) => (
                   <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#ccab59]/20 flex items-center justify-center mb-3">
                         <item.icon size={18} className="text-[#ccab59]" />
                      </div>
                      <div className="text-[12px] font-black text-white mb-1 uppercase tracking-tight">{item.label}</div>
                      <div className="text-[9px] text-slate-500 font-medium">{item.desc}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </Page>

      {/* ── PAGE 5: PROJECT LOCATION ── */}
      <Page pageNumber={5}>
        <div className="space-y-12 pb-12">
           <div className="flex items-center gap-6 pt-8">
              <div className="h-px flex-1 bg-gray-100" />
              <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-3">
                Project Location
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
           </div>

           <div className="relative h-[450px] w-full bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 group">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-[#fdfaf3] grid grid-cols-6 grid-rows-4 opacity-50">
                 {Array(24).fill(0).map((_,i) => <div key={i} className="border border-slate-200/40" />)}
              </div>
              
              {/* Map Info Overlay */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/80 rounded-full text-[10px] font-bold text-white backdrop-blur-md">
                 <MapPin size={12} className="text-[#ccab59]" /> {b.community} <span className="opacity-40 ml-2">◆ Google Maps</span>
              </div>

              {/* Pin Callout */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <div className="bg-[#ccab59] p-6 rounded-[2rem] shadow-2xl shadow-amber-900/40 text-center scale-110 group-hover:scale-125 transition-transform duration-700">
                    <div className="text-[18px] font-black text-white mb-0.5">{b.title}</div>
                    <div className="text-[9px] font-black text-white/90 uppercase tracking-widest">From AED 6,759,888 <span className="opacity-40 font-bold ml-1">{b.community}</span></div>
                 </div>
                 <div className="w-px h-12 bg-[#ccab59]" />
              </div>

              <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/80 rounded-lg text-[10px] font-black text-[#ccab59] uppercase tracking-widest backdrop-blur-md">
                 25.2048°N, 55.2708°E
              </div>
           </div>

           <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Community", val: b.community, icon: Building2 },
                { label: "City", val: "Dubai", icon: Globe },
                { label: "Developer", val: b.developer, icon: PieChart }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#ccab59]">
                      <item.icon size={18} />
                   </div>
                   <div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</div>
                      <div className="text-[12px] font-black text-slate-900">{item.val}</div>
                   </div>
                </div>
              ))}
           </div>

           <div className="space-y-8">
              <h3 className="text-[10px] font-black text-[#ccab59] uppercase tracking-[0.4em]">Distance to Key Locations</h3>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                 {[
                   { label: "Dubai Intl Airport (DXB)", time: "15-35 min", icon: Zap },
                   { icon: Building2, label: "Downtown / Burj Khalifa", time: "18-30 min" },
                   { icon: Building2, label: "Dubai Mall", time: "18-30 min" },
                   { icon: Building2, label: "Nearest Hospital", time: "5-15 min" },
                   { icon: Building2, label: "Al Maktoum Intl (DWC)", time: "25-45 min" },
                   { icon: Building2, label: "Dubai Marina / JBR", time: "15-30 min" },
                   { icon: Building2, label: "Palm Jumeirah", time: "15-35 min" },
                   { icon: Building2, label: "International Schools", time: "5-15 min" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 group hover:border-[#ccab59]/30 transition-colors">
                      <div className="flex items-center gap-3">
                         <item.icon size={14} className="text-[#ccab59] opacity-40 group-hover:opacity-100" />
                         <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900">{item.label}</span>
                      </div>
                      <span className="text-[11px] font-black text-[#ccab59]">{item.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </Page>

      <style dangerouslySetInnerHTML={{ __html: `
        @font-face {
          font-family: 'Playfair Display';
          src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
        }
        @media print {
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .min-h-screen { padding: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          .mb-12 { margin-bottom: 0 !important; page-break-after: always !important; }
          .max-w-[1000px] { max-width: 100% !important; border: none !important; }
          @page { size: A4; margin: 0; }
        }
      `}} />
    </div>
  );
}

const WalletIcon = ({ size, className }) => <DollarSign size={size} className={className} />;
