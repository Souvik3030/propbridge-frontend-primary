import { Card, CardContent, CardHeader, CardTitle } from "../../../../ui/Card";

export function DeveloperInfoCard({ developer, unitsListed }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Developer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-[#ece7d9] dark:border-slate-700 overflow-hidden">
            {developer?.logo ? (
              <img src={developer.logo} alt={developer.name} className="w-full h-full object-contain p-1" />
            ) : (
              <span className="font-bold text-slate-400 text-[10px] text-center leading-tight">Logo</span>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{developer?.name || 'Unknown'}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{unitsListed} units listed on Bayut</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
