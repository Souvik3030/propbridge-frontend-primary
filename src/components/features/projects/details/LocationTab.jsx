import { LocationCard } from "./overview/LocationCard";

export default function LocationTab({ project }) {
  if (!project) return null;

  return (
    <div>
      <LocationCard city={project.location?.city} community={project.location?.community} />
    </div>
  );
}
