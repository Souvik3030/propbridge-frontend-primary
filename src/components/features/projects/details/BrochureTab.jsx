import React from 'react';
import { BrochureGeneratorCard } from './overview/BrochureGeneratorCard';

export default function BrochureTab({ project, onGenerateBrochure }) {
  if (!project) return null;

  return (
    <div>
      <BrochureGeneratorCard onGenerateBrochure={onGenerateBrochure} />
    </div>
  );
}
