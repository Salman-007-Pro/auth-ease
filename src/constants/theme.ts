import { FontFamily } from '@/utilities/shared/Fonts';
import { Theme } from '@react-navigation/native';

import { Colors } from '@/constants/colors';

// Default theme
export const DEFAULT_THEME: Theme = {
    dark: false,
    colors: {
        primary: Colors.primary,
        background: Colors.white,
        card: Colors.white,
        text: Colors.textPrimary,
        border: Colors.border,
        notification: Colors.error,
    },
    fonts: {
        regular: { fontFamily: FontFamily.OpenSans, fontWeight: 'normal' },
        medium: { fontFamily: FontFamily.OpenSans, fontWeight: '500' },
        bold: { fontFamily: FontFamily.OpenSans, fontWeight: 'bold' },
        heavy: { fontFamily: FontFamily.OpenSans, fontWeight: '900' },
    },
};
