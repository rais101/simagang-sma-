import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { MASTER_AI_STUDIO_PROMPT } from '../data/mockData';

interface PromptModalProps {
  onClose: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MASTER_AI_STUDIO_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Master Prompt Google AI Studio</h3>
              <p className="text-[11px] text-slate-500">Prompt optimal siap pakai untuk SMA IAS Al-Jannah Depok</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prompt Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
            💡 <strong>Panduan Penggunaan:</strong> Anda dapat langsung menyalin prompt terstruktur di bawah ini ke bilah obrolan Google AI Studio untuk meregenerasi atau menyesuaikan aplikasi magang ini kapan saja.
          </div>

          <div className="relative">
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-96 border border-slate-800">
              {MASTER_AI_STUDIO_PROMPT}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">Total ~400 kata • Dirancang khusus dengan batasan antarmuka simpel</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Berhasil Tersalin ke Clipboard' : 'Salin Semua'}
          </button>
        </div>

      </div>
    </div>
  );
};
