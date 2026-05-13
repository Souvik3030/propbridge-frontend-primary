import React from 'react';
import { Download, MessageSquare, Mail, Link, ClipboardList } from 'lucide-react';
import { Card } from '../../../../ui/Card';
import { Button } from '../../../../ui/Button';

export function BrochureGeneratorCard({ onGenerateBrochure }) {
  return (
    <Card className="p-8 bg-[#fdfbf6] dark:bg-slate-800/20 border-[#ece7d9] dark:border-slate-800">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-[17px] font-bold text-[#ccab59] mb-2 tracking-tight">Generate Custom Brochure</h3>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Create a premium investor-grade PDF brochure with payment plan, costs breakdown, and investment analysis.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            variant="gold" 
            className="px-6 py-2.5 h-auto text-[13px] font-bold rounded-lg shadow-sm" 
            icon={Download}
            onClick={onGenerateBrochure}
          >
            Premium Brochure
          </Button>
          <Button 
            variant="goldOutline" 
            className="px-6 py-2.5 h-auto text-[13px] font-bold rounded-lg" 
            icon={ClipboardList}
            onClick={onGenerateBrochure}
          >
            Comprehensive Brochure
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 mt-2">
          {/* WhatsApp Button */}
          <button className="flex items-center gap-2 bg-[#25d366] hover:bg-[#1ebe57] text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all shadow-sm">
            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-3 h-3 fill-white" />
            </span>
            WhatsApp
          </button>
          
          {/* Email Button */}
          <button className="flex items-center gap-2 border border-[#ccab59] text-[#ccab59] hover:bg-[#ccab59] hover:text-white px-5 py-2.5 rounded-full text-[13px] font-bold transition-all">
            <Mail className="w-4 h-4" /> Email
          </button>

          {/* Copy Link Button */}
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all">
            <Link className="w-4 h-4" /> Copy Link
          </button>

          {/* Copy Summary Button */}
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all">
            <ClipboardList className="w-4 h-4" /> Copy Summary
          </button>
        </div>
      </div>
    </Card>
  );
}
