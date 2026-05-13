import React from 'react';
import { Card } from '../../../ui/Card';
import { Button } from '../../../ui/Button';

export default function FloorplansTab() {
  return (
    <Card className="p-6 h-full flex flex-col justify-start items-start">
      <h3 className="text-[16px] font-bold text-[#ccab59] mb-4">Floor Plans & Images</h3>
      <p className="text-[13px] text-slate-500 dark:text-slate-400 mb-6 font-medium">
        Fetches floor plans from Bayut /floorplans API and listing photos from /properties_search in parallel.
      </p>
      <div>
        <Button variant="gold" className="px-5 py-2">
          Fetch Floor Plans & Photos
        </Button>
      </div>
    </Card>
  );
}
