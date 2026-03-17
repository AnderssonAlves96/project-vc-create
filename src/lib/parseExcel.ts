import * as XLSX from "xlsx";
import type { Vehicle } from "@/data/vehicles";
import { supabase } from "@/integrations/supabase/client";

export function parseVehicleExcel(file: File): Promise<Vehicle[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });

        const keys0 = Object.keys(rows[0] || {});
        const get = (row: Record<string, string>, keywords: string[]) => {
          const key = keys0.find((k) =>
            keywords.some((kw) => k.toUpperCase().includes(kw.toUpperCase()))
          );
          return key ? String(row[key]).trim() : "";
        };

        const parsed = rows
          .map((row) => ({
            placa: get(row, ["Identificação", "Placa", "Série"]),
            tipo: get(row, ["Tipo"]),
            manutencao_prevista: get(row, ["Manutenção Prevista", "Prevista"]),
            manutencao_realizada: get(row, ["Manutenção Realizada", "Realizada"]),
            tipo_manutencao: get(row, ["Tipo de Manutenção", "Tipo Manutenção"]),
            responsavel: get(row, ["Responsável", "Responsavel"]),
            proxima_manutencao: get(row, ["Próxima Manutenção", "Proxima"]),
            observacoes: get(row, ["Observações", "Observacoes", "Obs"]),
          }))
          .filter((v) => v.placa);

        // Upsert into Supabase using placa as unique key
        const { error } = await supabase
          .from("veiculos")
          .upsert(parsed, { onConflict: "placa" });

        if (error) {
          console.error("Supabase upsert error:", error);
          throw new Error(error.message);
        }

        // Return as Vehicle[] for UI update
        const vehicles: Vehicle[] = parsed.map((row, index) => ({
          id: String(index + 1),
          tipo: row.tipo,
          placa: row.placa,
          manutencaoPrevista: row.manutencao_prevista,
          manutencaoRealizada: row.manutencao_realizada,
          tipoManutencao: row.tipo_manutencao,
          responsavel: row.responsavel,
          proximaManutencao: row.proxima_manutencao,
          observacoes: row.observacoes,
        }));

        resolve(vehicles);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
