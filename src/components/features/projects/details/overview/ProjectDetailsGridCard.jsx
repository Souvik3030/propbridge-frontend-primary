import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../ui/Card';

const uniqueBedsStr = (ur) => {
  if (!ur || !ur.length) return '';
  return [...new Set(ur)].sort((a, b) => a - b).join(', ') + ' BR';
};

export function ProjectDetailsGridCard({ project }) {
  if (!project) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Built-up Area: <span className="font-bold text-slate-900 dark:text-white">{project.area?.builtUp?.toLocaleString()} {project.area?.unit}</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Units Listed: <span className="font-bold text-slate-900 dark:text-white">{project.unitsCount}</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Type: <span className="font-bold text-slate-900 dark:text-white">{project.type?.main}</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Category: <span className="font-bold text-slate-900 dark:text-white">{project.type?.sub}</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Purpose: <span className="font-bold text-slate-900 dark:text-white">For-sale</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Room Types: <span className="font-bold text-slate-900 dark:text-white">{uniqueBedsStr(project.rooms).replace(' BR', '')} BR</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
