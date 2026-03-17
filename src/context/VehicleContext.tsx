import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { vehicles as defaultVehicles, type Vehicle } from "@/data/vehicles";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const STORAGE_KEY = "beq-vehicles-data";

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehiclesState] = useState<Vehicle[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultVehicles;
      }
    }
    return defaultVehicles;
  });

  const setVehicles = (data: Vehicle[]) => {
    setVehiclesState(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useVehicles must be used within VehicleProvider");
  return ctx;
};
