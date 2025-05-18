import { Colors } from '@/constants/colors';

import { generatedFontSize } from './Metrics';

export enum FontFamily {
    OpenSans = 'OpenSans',
    Outfit = 'Outfit',
}

export enum FontTypes {
    Bold = 'Bold',
    Medium = 'Medium',
    Regular = 'Regular',
    SemiBold = 'SemiBold',
}

export const FontVariations = {
    'OpenSans-Bold': require('@/assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Medium': require('@/assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-Regular': require('@/assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('@/assets/fonts/OpenSans-SemiBold.ttf'),
    'Outfit-Bold': require('@/assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Medium': require('@/assets/fonts/Outfit-Medium.ttf'),
    'Outfit-Regular': require('@/assets/fonts/Outfit-Regular.ttf'),
    'Outfit-SemiBold': require('@/assets/fonts/Outfit-SemiBold.ttf'),
};

/** Font style configuration type */
type FontStyle = {
    fontFamily: string;
    fontSize: number;
    color: string;
};

/**
 * Creates a font style configuration
 * @param type - Font weight/style type
 * @param size - Font size in points
 * @param color - Text color
 * @param variation - Font family variation
 * @returns Font style configuration object
 */
const font = (type: FontTypes, size: number, color: string, variation: FontFamily): FontStyle => {
    return {
        fontFamily: variation + '-' + type,
        fontSize: generatedFontSize(size),
        color,
    };
};

/**
 * Creates a Regular font style
 * @param size - Font size in points (default: 16)
 * @param color - Text color (default: Colors.textPrimary)
 * @param variation - Font family variation (default: FontFamily.OpenSans)
 * @returns Font style configuration
 */
const Regular = (size = 16, color = Colors.white, variation = FontFamily.OpenSans): FontStyle => {
    return font(FontTypes.Regular, size, color, variation);
};

/**
 * Creates a Bold font style
 * @param size - Font size in points (default: 16)
 * @param color - Text color (default: Colors.textPrimary)
 * @param variation - Font family variation (default: FontFamily.Outfit)
 * @returns Font style configuration
 */
const Bold = (size = 16, color = Colors.white, variation = FontFamily.Outfit): FontStyle => {
    return font(FontTypes.Bold, size, color, variation);
};

/**
 * Creates a SemiBold font style
 * @param size - Font size in points (default: 16)
 * @param color - Text color (default: Colors.textPrimary)
 * @param variation - Font family variation (default: FontFamily.Outfit)
 * @returns Font style configuration
 */
const SemiBold = (size = 16, color = Colors.white, variation = FontFamily.Outfit): FontStyle => {
    return font(FontTypes.SemiBold, size, color, variation);
};

/**
 * Creates a Medium font style
 * @param size - Font size in points (default: 16)
 * @param color - Text color (default: Colors.textPrimary)
 * @param variation - Font family variation (default: FontFamily.OpenSans)
 * @returns Font style configuration
 */
const Medium = (size = 16, color = Colors.white, variation = FontFamily.OpenSans): FontStyle => {
    return font(FontTypes.Medium, size, color, variation);
};

const Fonts = {
    FontFamily,
    font,
    Regular,
    Bold,
    SemiBold,
    Medium,
};

export default Fonts;
