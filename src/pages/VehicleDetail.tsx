import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Wrench, User, FileText, Truck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVehicles } from "@/context/VehicleContext";
import logo from "@/assets/logo.png";

const VehicleDetail = () => {
  const { placa } = useParams<{ placa: string }>();
  const navigate = useNavigate();
  const { vehicles } = useVehicles();

  const vehicle = vehicles.find((v) => v.placa === placa);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Veículo não encontrado: {placa}</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
      </div>
    );
  }

  const items = [
    { icon: Calendar, label: "MANUTENÇÃO PREVISTA", value: vehicle.manutencaoPrevista },
    { icon: Calendar, label: "MANUTENÇÃO REALIZADA", value: vehicle.manutencaoRealizada },
    { icon: Wrench, label: "TIPO DE MANUTENÇÃO", value: vehicle.tipoManutencao },
    { icon: User, label: "RESPONSÁVEL", value: vehicle.responsavel },
    { icon: Calendar, label: "PRÓXIMA MANUTENÇÃO", value: vehicle.proximaManutencao },
    { icon: FileText, label: "OBSERVAÇÕES", value: vehicle.observacoes },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Back button - hidden when accessed via QR scan on external device */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-6 print:hidden">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-1">
            <Truck className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">{vehicle.placa}</h1>
          </div>
          <p className="text-sm text-muted-foreground italic mb-6 ml-9">{vehicle.tipo}</p>

          {/* Detail Items */}
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <item.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer logo */}
          <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-border">
            <img src={logo} alt="B&Q Energia" className="h-8 w-8 rounded" />
            <span className="text-xs text-muted-foreground">B&Q Energia — COELBA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
