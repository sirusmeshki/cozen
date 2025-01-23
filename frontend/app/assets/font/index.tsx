import localFont from 'next/font/local';
import { Vazirmatn } from 'next/font/google';

export const Monument = localFont({ src: './MonumentExtended-Ultrabold.otf' });
export const Satoshi = localFont({ src: './Satoshi-Variable.ttf' });
export const Vazir = Vazirmatn({ subsets: ['arabic'] });
