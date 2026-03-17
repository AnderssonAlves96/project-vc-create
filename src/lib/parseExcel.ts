import * as XLSX from "xlsx";
import type { Vehicle } from "@/data/vehicles";

export function parseVehicleExcel(file: File): Promise<Vehicle[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });

        const vehicles: Vehicle[] = rows.map((row, index) => {
          // Try to match column headers flexibly
          const keys = Object.keys(row);
          const get = (keywords: string[]) => {
            const key = keys.find((k) =>
              keywords.some((kw) => k.toUpperCase().includes(kw.toUpperCase()))
            );
            return key ? String(row[key]).trim() : "";
          };

          return {
            id: String(index + 1),
            tipo: get(["Tipo"]),
            placa: get(["Identificação", "Placa", "Série"]),
            manutencaoPrevista: get(["Manutenção Prevista", "Prevista"]),
            manutencaoRealizada: get(["Manutenção Realizada", "Realizada"]),
            tipoManutencao: get(["Tipo de Manutenção", "Tipo Manutenção"]),
            responsavel: get(["Responsável", "Responsavel"]),
            proximaManutencao: get(["Próxima Manutenção", "Proxima"]),
            observacoes: get(["Observações", "Observacoes", "Obs"]),
          };
        }).filter((v) => v.placa); // Remove empty rows

        resolve(vehicles);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
