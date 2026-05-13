import React from 'react';

const RoleCard = ({ role, level, icon: Icon, description, permissionsCount, totalPermissions, colorClass, borderColorClass, progressColorClass }) => {
  const percentage = (permissionsCount / totalPermissions) * 100;

  return (
    <div className={`bg-white dark:bg-slate-900/50 rounded-2xl p-6 border-l-4 ${borderColorClass} border border-slate-200/50 dark:border-white/5 shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{Icon}</div>
          <div>
            <h4 className={`text-lg font-bold ${colorClass}`}>
              {role}
            </h4>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Level {level}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6 font-medium h-10 line-clamp-2">
        {description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-slate-900 dark:text-white text-xs font-black">
            {permissionsCount} / {totalPermissions} permissions
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColorClass} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
