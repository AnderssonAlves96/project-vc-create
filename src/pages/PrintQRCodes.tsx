import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { vehicles } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import logo from "@/assets/logo.png";

const PrintQRCodes = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);

  // Filter by plates if specified
  const placasParam = searchParams.get("placas");
  const selectedPlacas = placasParam ? placasParam.split(",") : null;
  const filtered = selectedPlacas
    ? vehicles.filter((v) => selectedPlacas.includes(v.placa))
    : vehicles;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Toolbar - hidden in print */}
      <div className="print:hidden flex items-center gap-4 p-4 border-b border-border">
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <span className="text-sm text-muted-foreground">{filtered.length} QR Codes</span>
        <Button size="sm" onClick={handlePrint} className="ml-auto">
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
      </div>

      {/* Printable content */}
      <div ref={printRef} className="p-8 print:p-4">
        <div className="text-center mb-8 print:mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={logo} alt="B&Q Energia" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-foreground">Manutenção Preventiva — COELBA</h1>
          </div>
          <p className="text-sm text-muted-foreground">QR Codes por placa</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 print:grid-cols-5 gap-6 print:gap-4">
          {filtered.map((v) => {
            const qrData = [
              v.placa, v.tipo, v.manutencaoPrevista, v.manutencaoRealizada,
              v.tipoManutencao, v.responsavel, v.proximaManutencao, v.observacoes,
            ].join("|");

            return (
              <div key={v.id} className="flex flex-col items-center gap-2 p-3 border border-border rounded-lg print:border-gray-300">
                <QRCodeSVG value={qrData} size={100} level="L" />
                <span className="text-xs font-bold text-foreground">{v.placa}</span>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{v.tipo}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrintQRCodes;
