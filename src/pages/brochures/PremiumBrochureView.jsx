import React, { useEffect, useState } from 'react';
import { 
  Download, Share2, Mail, Link as LinkIcon, 
  Copy, X, MapPin, Home, Maximize2, 
  Calendar, DollarSign, PieChart, Info, 
  Layers, CheckCircle2, ChevronRight,
  Printer, MessageSquare, Phone
} from 'lucide-react';

const MetricBox = ({ label, value, icon: Icon, color = "text-[#ccab59]" }) => (
  <div className="flex flex-col items-center justify-center p-4 border-r border-[#ffffff10] last:border-0">
    <div className={`text-[18px] font-black ${color} mb-1 transition-all`}>{value || '—'}</div>
    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
  </div>
);

const DetailCard = ({ label, value, icon: Icon }) => (
  <div className="bg-[#fcfaf5] dark:bg-slate-800/30 p-4 rounded-2xl flex items-center gap-4 border border-[#ece7d9] dark:border-slate-800">
    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-[#ece7d9]/50 dark:border-slate-700">
      <Icon className="text-[#ccab59]" size={18} />
    </div>
    <div>
      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="text-[14px] font-black text-slate-900 dark:text-white">{value}</div>
    </div>
  </div>
);

const PaymentCard = ({ label, value, subLabel }) => (
  <div className="bg-[#121926] p-5 rounded-2xl border border-white/5 shadow-xl">
    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</div>
    <div className="text-[17px] font-black text-white leading-tight mb-1">{value}</div>
    {subLabel && <div className="text-[10px] font-medium text-slate-400">{subLabel}</div>}
  </div>
);

export default function PremiumBrochureView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Try to load from localStorage
    const savedData = localStorage.getItem('lastGeneratedBrochure');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse brochure data", e);
      }
    }
  }, []);

  // Default fallback if no data
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

  const brochure = data ? { ...defaults, ...data } : defaults;

  return (
    <div className="min-h-screen bg-[#f8f6f0] dark:bg-[#0a0d18] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#ccab59]/30">
      
      {/* ── TOP TOOLBAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0f172a] border-b border-white/5 flex items-center justify-between px-4 gap-4 shadow-2xl overflow-x-auto no-scrollbar no-print">
        <div className="flex items-center gap-4">
          <div className="bg-[#ccab59] text-white p-2 rounded-lg">
            <Layers size={20} />
          </div>
          <div className="text-white hidden md:block">
            <div className="text-[14px] font-black leading-tight">Investment Dossier</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Premium Brochure V4.2</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-[#ccab59] hover:bg-[#b0934c] text-white rounded-lg text-xs font-black transition-all shadow-lg shadow-amber-600/20"
          >
            <Download size={14} /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-600/30 rounded-lg text-xs font-black transition-all">
            <MessageSquare size={14} /> Share WhatsApp
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 border border-blue-600/30 rounded-lg text-xs font-black transition-all hidden sm:flex">
            <Mail size={14} /> Send via Email
          </button>
          <div className="w-[1px] h-6 bg-white/10 mx-2" />
          <button onClick={() => window.close()} className="p-2 text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="pt-16 max-w-[1200px] mx-auto bg-white dark:bg-[#0f172a] shadow-2xl min-h-[1400px]">
        
        {/* SECTION 1: HERO COVER */}
        <div className="relative h-[600px] w-full overflow-hidden group">
          <img 
            src={brochure.image} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Hero"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d18] via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-8 left-8 text-[12px] font-black text-white tracking-[0.3em] uppercase opacity-60">
            VortexWeb
          </div>
          <div className="absolute top-8 right-8 text-[12px] font-black text-white tracking-[0.2em] uppercase opacity-60">
            March 2026
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="text-[12px] font-black text-[#ccab59] tracking-[0.5em] uppercase mb-4 animate-in slide-in-from-bottom-4 duration-700">
              Investment Dossier
            </div>
            <h1 className="text-[90px] font-serif font-black text-white leading-none mb-2 drop-shadow-2xl animate-in slide-in-from-bottom-8 duration-1000">
              {brochure.title}
            </h1>
            <div className="text-[20px] font-bold text-white/90 mb-4">
              by <span className="text-[#ccab59]">{brochure.developer}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin size={16} className="text-[#ccab59]" /> {brochure.location}
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#1a2235]/60 backdrop-blur-xl border-t border-white/10 grid grid-cols-6 h-20">
            <MetricBox label="Est. Yield" value="—" />
            <MetricBox label="Price (AED)" value={brochure.price?.replace('AED ', '')} />
            <MetricBox label="Bedrooms" value={brochure.beds} />
            <MetricBox label="Area (sq.ft.)" value={brochure.size?.replace(' sq.ft.', '')} />
            <MetricBox label="Handover" value={brochure.handover} color="text-amber-500" />
            <MetricBox label="Score" value="—" />
          </div>
        </div>

        {/* Branding Footer (Bottom of Section) */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/50">
          <span>VortexWeb · Exclusive Property Intelligence</span>
          <span>Page 1 of 4</span>
          <span>Confidential Investment Dossier</span>
        </div>

        {/* SECTION 2: PROPERTY SUMMARY */}
        <div className="p-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[16px] text-slate-500 dark:text-slate-400 leading-relaxed mb-12 text-center italic">
              {brochure.title} by {brochure.developer} in the prestigious {brochure.community} community. 
              This {(brochure.type || '').toLowerCase() || 'property'} offers {brochure.size} of premium living space with {brochure.beds} bedroom configuration. 
              Expected handover: {brochure.handover}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailCard label="TYPE" value={brochure.type} icon={Home} />
              <DetailCard label="BEDROOMS" value={brochure.beds} icon={Layers} />
              <DetailCard label="SIZE" value={brochure.size} icon={Maximize2} />
              <DetailCard label="PRICE" value={brochure.price} icon={DollarSign} />
              <DetailCard label="LOCATION" value={brochure.community} icon={MapPin} />
              <DetailCard label="DEVELOPER" value={brochure.developer} icon={PieChart} />
              <DetailCard label="HANDOVER" value={brochure.handover} icon={Calendar} />
              <DetailCard label="PAYMENT" value={brochure.paymentOption} icon={Layers} />
            </div>
          </div>
        </div>

        {/* SECTION 3: AMENITIES */}
        <div className="p-12 pt-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[28px] font-serif font-black text-slate-900 dark:text-white mb-6">
              Amenities & Features
            </h2>
            <div className="flex flex-wrap gap-3">
              {brochure.amenities.map((item, idx) => (
                <span 
                  key={idx} 
                  className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-[13px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:border-[#ccab59] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: GALLERY PREVIEW */}
        <div className="p-12 pt-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
              <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
                <span className="text-[#ccab59]">◆</span> Property Gallery <span className="text-[#ccab59]">◆</span>
              </h2>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
               <img 
                 src={brochure.image} 
                 className="w-full h-[500px] object-cover"
                 alt="Gallery"
                 crossOrigin="anonymous"
               />
            </div>
          </div>
        </div>

        {/* SECTION 5 & 6: FINANCIALS (DARK) */}
        <div className="bg-[#0a0d18] text-white p-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-[12px] font-black text-[#ccab59] uppercase tracking-[0.5em] flex items-center gap-3">
                <span>◆</span> Payment Structure <span>◆</span>
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Quick cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <PaymentCard label="COMMUNITY" value={brochure.community} />
              <PaymentCard label="UNIT TYPE" value={brochure.type} />
              <PaymentCard label="HANDOVER" value={brochure.handover} />
              <PaymentCard label="SELLING PRICE" value={brochure.price} />
              <PaymentCard label="PAYMENT OPTION" value={brochure.paymentOption} />
              <PaymentCard label="ALREADY PAID" value="100%" />
            </div>

            {/* Schedule Table */}
            <div className="mb-16">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-8">Payment Schedule</h3>
              <div className="border-t border-b border-white/5 py-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                      <th className="py-4 pb-6">Milestone</th>
                      <th className="py-4 pb-6 text-center">%</th>
                      <th className="py-4 pb-6 text-right">Amount (AED)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {brochure.schedule.map((row, i) => (
                      <tr key={i} className="group">
                        <td className="py-5 text-[14px] font-bold text-white/90 group-hover:text-white transition-colors">{row.label}</td>
                        <td className="py-5 text-[14px] font-black text-[#ccab59] text-center">{row.percent}</td>
                        <td className="py-5 text-[14px] font-black text-white text-right">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-[#ccab59]/30">
                      <td className="py-6 text-[15px] font-black text-[#ccab59] uppercase tracking-widest">Total</td>
                      <td className="py-6 text-[15px] font-black text-[#ccab59] text-center">100%</td>
                      <td className="py-6 text-[15px] font-black text-[#ccab59] text-right">{brochure.price}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Additional Costs */}
            <div>
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-8">Additional Costs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[12px] font-bold text-slate-400">DLD Registration (4%)</span>
                  <span className="text-[14px] font-black text-white">AED 270,396</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[12px] font-bold text-slate-400">Commission (2.1%)</span>
                  <span className="text-[14px] font-black text-white">AED 141,958</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[12px] font-bold text-slate-400">Conveyancing Fee</span>
                  <span className="text-[14px] font-black text-white">AED 3,200</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[12px] font-bold text-slate-400">Trustee Fee</span>
                  <span className="text-[14px] font-black text-white">AED 4,000</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── FINAL FOOTER ── */}
        <div className="p-12 border-t border-gray-100 dark:border-slate-800 text-center">
          <div className="text-[12px] font-black text-[#ccab59] tracking-[0.4em] uppercase mb-4">
            VortexWeb Proprietary Analysis
          </div>
          <div className="text-[10px] text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            This dossier is for informational purposes only. All prices and payment plans are subject to change by the developer. 
            Estimated yields are based on current market trends and are not guaranteed.
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .fixed, .no-print { display: none !important; }
          body { background: white !important; }
          .pt-16 { pt: 0 !important; padding-top: 0 !important; }
          .max-w-[1200px] { max-width: 100% !important; margin: 0 !important; shadow: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          .rounded-3xl, .rounded-2xl, .rounded-xl { border-radius: 0 !important; }
        }
      `}} />
    </div>
  );
}
