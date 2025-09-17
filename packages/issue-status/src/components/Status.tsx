import { useData } from "../api/useData";
import type { ComponentType } from "../api/types";
import { Skeleton } from "./Skeleton";

const calculateOverallStatus = (
  components: ComponentType[]
): { message: string; color: string } => {
  const allComponents = components.flatMap((comp) =>
    comp.children ? [comp, ...comp.children] : [comp]
  );

  const statusCounts = allComponents.reduce((acc, component) => {
    acc[component.status] = (acc[component.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalComponents = allComponents.length;

  if (statusCounts.operational === totalComponents) {
    // overall = operational
    return {
      message: "All Systems Operational",
      color: "bg-green-600 dark:bg-green-700",
    };
  }
  if (statusCounts.incident === totalComponents) {
    // overall = major
    return {
      message: "All BUs Active Incident",
      color: "bg-red-600 dark:bg-red-700",
    };
  }
  if (statusCounts.investigation === totalComponents) {
    // overall = partial
    return {
      message: "All BUs Under Investigation",
      color: "bg-red-500 dark:bg-red-600",
    };
  }
  

  if (statusCounts.incident > 0) {
    // overall = partial
    return {
      message: "Ongoing Cyber Incidents",
      color: "bg-red-500 dark:bg-red-600",
    };
  }
  if (statusCounts.investigation > 0) {
    // overall = minor
    return {
      message: "Ongoing Cyber Investigation",
      color: "bg-yellow-600 dark:bg-yellow-700",
    };
  }
  
  // overall = operational
  return {
    message: "All Systems Operational",
    color: "bg-green-600 dark:bg-green-700",
  };
};

export const Status = () => {
  const { components, loading } = useData();

  if (loading || !components) {
    return (
      <div className="p-4 rounded-xs mb-8">
        <Skeleton />
      </div>
    );
  }

  const { message, color } = calculateOverallStatus(components);

  return (
    <div
      className={`
        ${color}
        text-white
        p-4
        rounded-xs
        mb-8
        flex justify-between items-center flex-wrap
        transition-all duration-300
      `}
    >
      <h2 className="text-xl m-0 font-normal">{message}</h2>
    </div>
  );
};
