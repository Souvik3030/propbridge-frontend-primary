import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, RefreshCcw, Building2, LayoutGrid, List, Search } from 'lucide-react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminTabs from '../../components/admin/AdminTabs';
import AddCompanyForm from '../../components/admin/AddCompanyForm';
import CompanyCard from '../../components/admin/CompanyCard';
import CompanyListRow from '../../components/admin/CompanyListRow';
import AddUserForm from '../../components/admin/AddUserForm';
import UserTable from '../../components/admin/UserTable';
import RolePermissions from '../../components/admin/RolePermissions';
import AuditLog from '../../components/admin/AuditLog';

import { useCompanies } from '../../hooks/useAdmin';

const CompaniesSection = () => {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    data, 
    isLoading, 
    isFetching,
    error, 
    refetch 
  } = useCompanies(page);
  
  const companies = data?.data || [];
  const pagination = data?.meta || { current_page: 1, last_page: 1, total: 0 };

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    const q = searchQuery.toLowerCase();
    return companies.filter(c => 
      (c.name && c.name.toLowerCase().includes(q)) || 
      (c.plan && c.plan.toLowerCase().includes(q)) ||
      (c.slug && c.slug.toLowerCase().includes(q))
    );
  }, [companies, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AddCompanyForm />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200 dark:border-white/5">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            Registered Entities 
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#ccab59]/10 text-[#ccab59] text-sm font-bold">
              {pagination.total || 0}
            </span>
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-medium">Manage and monitor all active enterprise partners.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Smart Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter by name, plan or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold focus:ring-[3px] focus:ring-[#ccab59]/10 focus:border-[#ccab59]/40 transition-all outline-none text-slate-800 dark:text-white placeholder:text-slate-400 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4 justify-between sm:justify-start">
            <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-300/20 dark:border-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#ccab59]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#ccab59]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">List</span>
              </button>
            </div>

            <button 
              onClick={() => refetch()}
              disabled={isLoading || isFetching}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#ccab59] hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          </div>
        </div>
      </div>

      {isLoading && companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-4 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-[#ccab59]" />
            <div className="absolute inset-0 blur-xl bg-[#ccab59]/20 animate-pulse" />
          </div>
          <p className="font-bold tracking-tight uppercase text-[10px]">Retrieving Platform Ecosystem...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl p-8 text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">!</span>
            </div>
            <p className="font-bold mb-2">Platform Connection Interfered</p>
            <p className="text-xs opacity-70">{error.message || 'Failed to load data'}</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-white dark:bg-slate-900/50 rounded-[2.5rem] p-20 border border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center mb-6">
            <Building2 className="w-10 h-10 text-slate-200 dark:text-white/10" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Partnerships Initiated</h4>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">Your professional ecosystem is current empty. Start by onboarding your first enterprise entity.</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8" : "flex flex-col gap-6"}>
          {filteredCompanies.map(company => (
            viewMode === 'grid' ? (
              <CompanyCard key={company.id} company={company} />
            ) : (
              <CompanyListRow key={company.id} company={company} />
            )
          ))}
        </div>
      )}

      {pagination.last_page > 1 && (
        <div className="flex flex-wrap justify-center mt-16 gap-3 pb-8">
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`min-w-[44px] h-11 rounded-2xl font-black text-xs transition-all duration-300 border ${
                page === p
                  ? 'bg-[#ccab59] text-white border-[#ccab59] shadow-xl shadow-[#ccab59]/30 -translate-y-1'
                  : 'bg-white dark:bg-slate-900/50 text-slate-500 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminPage = () => {
  return (
    <div className="min-h-screen pt-4 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="space-y-4">
        <AdminHeader />
        <AdminTabs />
      </div>
      
      <main className="relative">
        <Routes>
          <Route path="companies" element={<CompaniesSection />} />
          <Route path="users" element={
            <div className="space-y-10">
              {/* <AddUserForm /> */}
              <UserTable />
            </div>
          } />
          <Route path="roles" element={<RolePermissions />} />
          <Route path="audit" element={<AuditLog />} />
          <Route path="/" element={<Navigate to="companies" replace />} />
        </Routes>
      </main>

    </div>
  );
};

export default AdminPage;
