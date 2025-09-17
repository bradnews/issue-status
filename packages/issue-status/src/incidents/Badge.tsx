import type { ComponentType } from "../api/types";

export const Badge = ({ status }: { status: ComponentType["status"] }) => {
  const statusClasses: Record<ComponentType["status"], string> = {
    operational: "text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900",
    investigation: "text-amber-800 bg-amber-100 dark:text-amber-200 dark:bg-amber-900",
    incident: "text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900",
  };

  const statusText: Record<ComponentType["status"], string> = {
    operational: "No Active Incident",
    investigation: "Incident Investigation",
    incident: "Active Incident Ongoing",
    unknown: "Unknown",
  };

  const badgeClasses = `
    px-3 py-1 rounded-full text-xs font-semibold
    ${statusClasses[status]}
  `;

  return <div className={badgeClasses}>{statusText[status]}</div>;
};
