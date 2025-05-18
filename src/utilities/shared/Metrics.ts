import { Dimensions, PixelRatio } from 'react-native';

/** Base width used for scaling calculations */
const guidelineBaseWidth = 428;

/** Base height used for scaling calculations */
const guidelineBaseHeight = 926;

/** Current screen dimensions */
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Scales a size horizontally based on screen width
 * @param size - Original size to scale
 * @returns Scaled size
 */
const scale = (size: number): number => (screenWidth / guidelineBaseWidth) * size;

/**
 * Scales a size vertically based on screen height
 * @param size - Original size to scale
 * @returns Scaled size
 */
const verticalScale = (size: number): number => (screenHeight / guidelineBaseHeight) * size;

/**
 * Moderately scales a size using a factor
 * @param size - Original size to scale
 * @param factor - Scale factor (default 0.5)
 * @returns Moderately scaled size
 */
const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;

/**
 * Generates a font size scaled for the device
 * @param size - Original font size
 * @returns Scaled font size accounting for device font scale
 */
const generatedFontSize = (size: number): number => moderateScale(size / PixelRatio.getFontScale());

export { generatedFontSize, moderateScale, scale, screenHeight, screenWidth, verticalScale };
