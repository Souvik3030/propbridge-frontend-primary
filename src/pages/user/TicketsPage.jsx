import React from 'react';
import { Ticket, Link as LinkIcon } from 'lucide-react';

const ticketStats = [
  { label: 'Open', value: 1, color: 'text-blue-500' },
  { label: 'In Progress', value: 0, color: 'text-orange-400' },
  { label: 'Resolved', value: 0, color: 'text-green-500' },
  { label: 'Closed', value: 0, color: 'text-gray-400' },
];

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

const TicketsPage = () => {
  return (
    <div className="min-h-full bg-[#f5f2eb] dark:bg-brand-secondary py-8 px-6 lg:px-10">
      <div className="max-w-full mx-auto">
        {/* Title Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Ticket className="h-6 w-6 text-[#cdab5c] fill-[#cdab5c]" />
            <h1 className="font-serif text-3xl font-bold text-[#111424] dark:text-white">Support Tickets</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 dark:text-brand-muted">
            {tickets.length} total tickets
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {ticketStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-xl border border-white/50 dark:border-white/5 bg-white dark:bg-brand-card p-8 shadow-sm dark:shadow-2xl"
            >
              <p className={`text-5xl font-medium ${stat.color} mb-3`}>{stat.value}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-brand-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tickets Table */}
        <div className="overflow-hidden rounded-xl border border-white/50 dark:border-white/5 bg-white dark:bg-brand-card shadow-sm dark:shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F4F1E9] dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-brand-muted">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Created By</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                    <td className="px-6 py-6 text-sm font-bold text-[#cdab5c]">{ticket.id}</td>
                    <td className="px-6 py-6 text-sm font-bold text-[#111424] dark:text-white/90">{ticket.subject}</td>
                    <td className="px-6 py-6">
                      <div className="text-sm font-bold text-[#111424] dark:text-white/90 leading-tight">{ticket.createdBy}</div>
                      <div className="mt-1 text-[10px] text-slate-400 dark:text-brand-muted">{ticket.createdByMeta}</div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex rounded-md bg-red-50 dark:bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex rounded-md bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-brand-muted">
                        <LinkIcon className="h-3.5 w-3.5 opacity-60" />
                        <span>{ticket.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right text-xs font-medium text-slate-400 dark:text-brand-muted">{ticket.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
