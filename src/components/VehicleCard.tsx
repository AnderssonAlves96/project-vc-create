import { QRCodeSVG } from "qrcode.react";
import { Wrench, Calendar, Truck } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const qrData = `${vehicle.placa}|${vehicle.tipo}|${vehicle.manutencao}|${vehicle.proximaManutencao}${vehicle.unidade}`;

  return (
    <div className="bg-card rounded-lg border border-border p-5 flex justify-between items-start hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-foreground">{vehicle.placa}</span>
        </div>
        <p className="text-sm text-muted-foreground italic">{vehicle.tipo}</p>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-success" />
            <span className={vehicle.manutencao === "PREVENTIVA" ? "text-success" : "text-warning"}>
              {vehicle.manutencao}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Próx: {vehicle.proximaManutencao} {vehicle.unidade}</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <QRCodeSVG value={qrData} size={80} level="L" />
      </div>
    </div>
  );
};

export default VehicleCard;
