-- Create veiculos table
CREATE TABLE public.veiculos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo TEXT NOT NULL DEFAULT '',
  placa TEXT NOT NULL UNIQUE,
  manutencao_prevista TEXT NOT NULL DEFAULT '',
  manutencao_realizada TEXT NOT NULL DEFAULT '',
  tipo_manutencao TEXT NOT NULL DEFAULT '',
  responsavel TEXT NOT NULL DEFAULT '',
  proxima_manutencao TEXT NOT NULL DEFAULT '',
  observacoes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.veiculos ENABLE ROW LEVEL SECURITY;

-- Public read access (fleet data, no PII)
CREATE POLICY "Anyone can read veiculos"
  ON public.veiculos FOR SELECT
  USING (true);

-- Public insert/update for upload functionality (no auth in this app)
CREATE POLICY "Anyone can insert veiculos"
  ON public.veiculos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update veiculos"
  ON public.veiculos FOR UPDATE
  USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_veiculos_updated_at
  BEFORE UPDATE ON public.veiculos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();