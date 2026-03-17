export interface Vehicle {
  id: string;
  placa: string;
  tipo: string;
  manutencao: "PREVENTIVA" | "CORRETIVA";
  proximaManutencao: string;
  unidade: "KM" | "H";
}

export const vehicles: Vehicle[] = [
  { id: "1", placa: "IZG8B01", tipo: "CAMINHÃO MUNK", manutencao: "PREVENTIVA", proximaManutencao: "180.023", unidade: "KM" },
  { id: "2", placa: "PNU1606", tipo: "CAMINHÃO SKY", manutencao: "PREVENTIVA", proximaManutencao: "120.365", unidade: "KM" },
  { id: "3", placa: "RET0024", tipo: "RETROESCAVADEIRA", manutencao: "PREVENTIVA", proximaManutencao: "6081", unidade: "H" },
  { id: "4", placa: "RET0026", tipo: "RETROESCAVADEIRA", manutencao: "PREVENTIVA", proximaManutencao: "5520", unidade: "H" },
  { id: "5", placa: "RET0039", tipo: "RETROESCAVADEIRA", manutencao: "PREVENTIVA", proximaManutencao: "1001", unidade: "H" },
  { id: "6", placa: "RET0040", tipo: "RETROESCAVADEIRA", manutencao: "PREVENTIVA", proximaManutencao: "500", unidade: "H" },
  { id: "7", placa: "CAM0012", tipo: "CAMINHÃO BAÚ", manutencao: "PREVENTIVA", proximaManutencao: "95.200", unidade: "KM" },
  { id: "8", placa: "SKY0033", tipo: "CAMINHÃO SKY", manutencao: "CORRETIVA", proximaManutencao: "45.000", unidade: "KM" },
  { id: "9", placa: "MNK0045", tipo: "CAMINHÃO MUNK", manutencao: "PREVENTIVA", proximaManutencao: "210.500", unidade: "KM" },
];
