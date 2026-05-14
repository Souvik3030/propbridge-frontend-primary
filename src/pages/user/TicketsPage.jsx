import React from 'react';
import { Ticket, ExternalLink } from 'lucide-react';

const TicketsPage = () => {
  const tickets = [
    {
      id: 'TKT-001',
      subject: 'bjhb jbn jk',
      createdBy: 'Ishika Vishnoi',
      createdByMeta: 'admin · VortexWeb LLC',
      priority: 'Urgent',
      status: 'Open',
      category: 'Portal Sync Error',
      date: '5/7/2026',
    },
  ];

  const ticketStats = [
    { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: 'text-[#3b82f6]' },
    { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: 'text-[#f59e0b]' },
    { label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, color: 'text-[#10b981]' },
    { label: 'Closed', value: tickets.filter(t => t.status === 'Closed').length, color: 'text-slate-400 dark:text-[#888888]' },
  ];

  return (
    <div className="min-h-full bg-[#fdfcf9] dark:bg-[#0a0d14] py-8 px-6 lg:px-10 transition-colors duration-300">
      <div className="max-w-full mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-extrabold font-serif text-[#111424] dark:text-[#f0f0f0] transition-colors flex items-center gap-2">
            🎫 Support Tickets
          </h2>
          <div className="text-[13px] text-slate-400 dark:text-[#8892a4] transition-colors font-medium">
            {tickets.length} total tickets
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {ticketStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[10px] p-3.5 text-center cursor-pointer transition-all hover:border-[#c9a84c30] dark:hover:border-white/10 hover:shadow-sm"
            >
              <div className={`text-2xl font-extrabold ${stat.color} font-mono transition-colors`}>
                {stat.value}
              </div>
              <div className="text-[11px] font-semibold text-slate-400 dark:text-[#8892a4] mt-1 transition-colors uppercase tracking-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tickets Table */}
        <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[12px] overflow-hidden transition-colors shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#fcfaf5] dark:bg-[#1e2440] transition-colors">
                  {['ID', 'Subject', 'Created By', 'Priority', 'Status', 'Category', 'Date'].map((header) => (
                    <th
                      key={header}
                      className="p-[10px_12px] text-left text-[10px] font-bold text-slate-400 dark:text-[#4d5a78] uppercase tracking-[0.8px] border-b border-slate-100 dark:border-white/5 transition-colors"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                      <td className="p-[10px_12px] text-[13px] font-bold text-[#a38847] dark:text-[#c9a84c] font-mono">
                        {ticket.id}
                      </td>
                      <td className="p-[10px_12px] text-[13px] font-semibold text-[#111424] dark:text-[#f0f0f0] transition-colors">
                        {ticket.subject}
                      </td>
                      <td className="p-[10px_12px]">
                        <div className="text-[13px] font-semibold text-[#111424] dark:text-[#f0f0f0]">{ticket.createdBy}</div>
                        <div className="text-[10px] text-slate-400 dark:text-[#8892a4]">{ticket.createdByMeta}</div>
                      </td>
                      <td className="p-[10px_12px]">
                        <span className="inline-flex px-2 py-0.5 rounded-[6px] bg-red-50 dark:bg-red-500/10 text-[10px] font-bold text-red-500 dark:text-red-400 uppercase font-mono">
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="p-[10px_12px]">
                        <span className="inline-flex px-2 py-0.5 rounded-[6px] bg-blue-50 dark:bg-blue-500/10 text-[10px] font-bold text-blue-500 dark:text-blue-400 uppercase font-mono">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-[10px_12px]">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-[#8892a4] font-medium">
                          <ExternalLink className="w-3 h-3 opacity-60" />
                          <span>{ticket.category}</span>
                        </div>
                      </td>
                      <td className="p-[10px_12px] text-[11px] text-slate-400 dark:text-[#8892a4] font-medium font-mono">
                        {ticket.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-slate-400 dark:text-[#4d5a78] font-medium text-[13px]">
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
