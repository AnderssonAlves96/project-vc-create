import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Vehicle } from "@/data/vehicles";
import { supabase } from "@/integrations/supabase/client";

interface VehicleContextType {
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
  loading: boolean;
  refreshVehicles: () => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehiclesState] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("veiculos")
      .select("*")
      .order("placa");

    if (error) {
      console.error("Error fetching vehicles:", error);
      setLoading(false);
      return;
    }

    const mapped: Vehicle[] = (data || []).map((row: any) => ({
      id: row.id,
      tipo: row.tipo || "",
      placa: row.placa || "",
      manutencaoPrevista: row.manutencao_prevista || "",
      manutencaoRealizada: row.manutencao_realizada || "",
      tipoManutencao: row.tipo_manutencao || "",
      responsavel: row.responsavel || "",
      proximaManutencao: row.proxima_manutencao || "",
      observacoes: row.observacoes || "",
    }));

    setVehiclesState(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const setVehicles = (data: Vehicle[]) => {
    setVehiclesState(data);
  };

  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles, loading, refreshVehicles: fetchVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useVehicles must be used within VehicleProvider");
  return ctx;
};
