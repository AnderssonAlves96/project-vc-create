import { Calendar, Wrench, User, FileText, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Vehicle } from "@/data/vehicles";

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VehicleDetailModal = ({ vehicle, open, onOpenChange }: VehicleDetailModalProps) => {
  if (!vehicle) return null;

  const items = [
    { icon: Calendar, label: "MANUTENÇÃO PREVISTA", value: vehicle.manutencaoPrevista },
    { icon: Calendar, label: "MANUTENÇÃO REALIZADA", value: vehicle.manutencaoRealizada },
    { icon: Calendar, label: "DATA DA REVISÃO", value: vehicle.dataRevisao },
    { icon: Wrench, label: "TIPO DE MANUTENÇÃO", value: vehicle.tipoManutencao },
    { icon: User, label: "RESPONSÁVEL", value: vehicle.responsavel },
    { icon: Calendar, label: "PRÓXIMA MANUTENÇÃO", value: vehicle.proximaManutencao },
    { icon: FileText, label: "OBSERVAÇÕES", value: vehicle.observacoes },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl font-bold">{vehicle.placa}</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground italic">{vehicle.tipo}</p>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailModal;
