import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileUp, Printer } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import VehicleDetailModal from "@/components/VehicleDetailModal";
import { vehicles, type Vehicle } from "@/data/vehicles";
import logo from "@/assets/logo.png";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const filtered = vehicles.filter(
    (v) =>
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.tipo.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalOpen(true);
  };

  const handlePrintQRCodes = () => {
    const placas = filtered.map((v) => v.placa).join(",");
    navigate(`/imprimir-qrcodes?placas=${placas}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={logo} alt="B&Q Energia" className="h-14 w-14 rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manutenção Preventiva</h1>
            <p className="text-muted-foreground">Controle de manutenção da frota — COELBA</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por placa ou tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-muted-foreground">{filtered.length} veículos</span>
            <Button variant="outline" size="sm">
              <FileUp className="h-4 w-4 mr-2" />
              Atualizar planilha
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrintQRCodes}>
              <Printer className="h-4 w-4 mr-2" />
              Imprimir QR Codes
            </Button>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={handleCardClick} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Nenhum veículo encontrado.
          </div>
        )}
      </div>

      <VehicleDetailModal
        vehicle={selectedVehicle}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
