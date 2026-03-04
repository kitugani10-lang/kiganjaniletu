import { Sparkles, Briefcase, Heart, HeartPulse, HandHeart, HelpCircle } from 'lucide-react';

export const CATEGORIES = [
  { slug: 'hoja', label: 'Hoja Mbalimbali', icon: HelpCircle },
  { slug: 'maombi', label: 'Kanisa Maombi', icon: HandHeart },
  { slug: 'unabii', label: 'Kanisa Unabii', icon: Sparkles },
  { slug: 'ujasiriamali', label: 'Kanisa Ujasiriamali', icon: Briefcase },
  { slug: 'mahusiano', label: 'Kanisa Mahusiano', icon: Heart },
  { slug: 'afya', label: 'Kanisa Afya', icon: HeartPulse },
] as const;
