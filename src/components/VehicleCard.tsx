import { QRCodeSVG } from "qrcode.react";
import { Wrench, Calendar, Truck } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  // Compact QR data: pipe-separated values
  const qrData = [
    vehicle.placa,
    vehicle.tipo,
    vehicle.manutencaoPrevista,
    vehicle.manutencaoRealizada,
    vehicle.tipoManutencao,
    vehicle.responsavel,
    vehicle.proximaManutencao,
    vehicle.observacoes,
  ].join("|");

  return (
    <div
      className="bg-card rounded-lg border border-border p-5 flex justify-between items-start hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(vehicle)}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-foreground">{vehicle.placa}</span>
        </div>
        <p className="text-sm text-muted-foreground italic">{vehicle.tipo}</p>
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center gap-2 text-sm">
            <Wrench className="h-4 w-4 text-success" />
            <span className="text-success">{vehicle.tipoManutencao}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Próx: {vehicle.proximaManutencao}</span>
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
