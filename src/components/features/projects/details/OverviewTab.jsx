import React from 'react';
import { PhotosCard } from './overview/PhotosCard';
import { PaymentPlansCard } from './overview/PaymentPlansCard';
import { MortgageEstimatorCard } from './overview/MortgageEstimatorCard';
import { DeveloperInfoCard } from './overview/DeveloperInfoCard';
import { BrochureGeneratorCard } from './overview/BrochureGeneratorCard';
import { ProjectDetailsGridCard } from './overview/ProjectDetailsGridCard';
import { LocationCard } from './overview/LocationCard';

export default function OverviewTab({ project, onGenerateBrochure }) {
  if (!project) return null;

  const mainImage = project.media?.coverImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* ── ALIGN LEFT (Span 2) ── */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <PhotosCard image={mainImage} title={project.title} />
        <PaymentPlansCard paymentPlans={project.paymentPlan} />
      </div>

      {/* ── ALIGN RIGHT (Span 1) ── */}
      <div className="flex flex-col gap-6">
        <MortgageEstimatorCard price={project.price} />
        <DeveloperInfoCard developer={project.developer} unitsListed={project.unitsCount} />
        <BrochureGeneratorCard onGenerateBrochure={onGenerateBrochure} />
        <ProjectDetailsGridCard project={project} />
        <LocationCard city={project.location?.city} community={project.location?.community} />
      </div>

    </div>
  );
}

