import { PaletteMode } from '@/modules/theme/interfaces';

export interface INote {
  id: string;
  color?: string;
  colorMode: PaletteMode;
  title: string;
  body: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}
