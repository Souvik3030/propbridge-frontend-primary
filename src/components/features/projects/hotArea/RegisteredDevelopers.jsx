import React from 'react';

const developerData = [
  { name: "ATRINIA DEVELOPMENTS L.L.C", license: "993828", expires: "2026-10-16", phone: "043933853" },
  { name: "EYAAN INFRA DEVELOPMENT L.L.C", license: "1584542", expires: "2027-01-04" },
  { name: "MAJAN AL GHURAIR REAL ESTATE DEVELOPMENT L.L.C S.O.C", license: "1565710", expires: "2027-01-01" },
  { name: "LUXURY UNHID REAL ESTATE DEVELOPMENT L.L.C", license: "1581064", expires: "2027-01-01" },
  { name: "EMIRATES REPORTAGE DEVELOPMENT & INVESTMENT L.L.C. - DUBAI BRANCH", license: "1433068", expires: "2026-10-29" },
  { name: "AL SAUD REAL ESTATE DEVELOPMENT L.L.C", license: "1437643", expires: "2026-12-16" },
  { name: "SMART S A C R REAL ESTATE BROKERS L.L.C", license: "985108", expires: "2026-10-09", phone: "91552101038" },
  { name: "ANANTA SHINE DEVELOPERS L.L.C", license: "1589478", expires: "2027-01-08" },
  { name: "NBCC OVERSEAS REAL ESTATE L.L.C", license: "1493703", expires: "2026-04-22" },
  { name: "ASSET HOMES GLOBAL REAL ESTATE CONSULTANCY L.L.C", license: "1156233", expires: "2026-03-14" },
  { name: "GRAND GULF REAL ESTATE DEVELOPMENT L.L.C", license: "1523315", expires: "2026-07-01" },
  { name: "HAYAT LUXURY", license: "1474249", expires: "2026-02-28" },
  { name: "ALPINE PRIME REAL ESTATE DEVELOPMENT L.L.C", license: "1587681", expires: "2027-01-12" },
  { name: "PRESTIGE GARDENS REAL ESTATE DEVELOPMENT L.L.C", license: "1591488", expires: "2027-01-14" },
  { name: "NEOTERRA DPC DEVELOPMENTS L.L.C", license: "1589338", expires: "2027-01-13" },
  { name: "URBANICA DEVELOPMENTS L.L.C", license: "1591756", expires: "2027-01-14" },
  { name: "GOLDFAIR REALTY L.L.C", license: "1591946", expires: "2027-01-14" },
  { name: "ALSAJRI REAL ESTATE DEVELOPMENT L.L.C S.O.C", license: "1591912", expires: "2027-01-15" },
  { name: "L M G Development International LLC", license: "1593149", expires: "2027-01-19" },
  { name: "AL THARAA INTERNATIONAL REAL ESTATE DEVELOPMENT L.L.C", license: "1591248", expires: "2027-01-21" },
];

const RegisteredDevelopers = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            DLD Registered Developers <span className="text-gray-400 dark:text-slate-500 font-normal">(79)</span>
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">
            Recently registered developers with DLD — verify license status
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {developerData.map((dev, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800/50 border border-[#F0F2F5] dark:border-slate-700 rounded-xl p-5 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all group cursor-default h-full flex flex-col justify-center"
            >
              <h3 className="text-[12px] font-bold text-slate-800 dark:text-slate-200 leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {dev.name}
              </h3>
              
              <div className="text-[11px] text-gray-400 dark:text-slate-500 space-y-0.5">
                <p>
                  License: <span className="text-gray-500 dark:text-slate-400">{dev.license}</span>
                </p>
                <p>
                  Expires: <span className="text-gray-500 dark:text-slate-400">{dev.expires}</span>
                  {dev.phone && <span className="ml-1">· {dev.phone}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredDevelopers;