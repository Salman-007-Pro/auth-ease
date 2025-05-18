import Fonts from '@/utilities/shared/Fonts';
import { scale, verticalScale } from '@/utilities/shared/Metrics';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

import { Colors } from '@/constants/colors';

import lodashIsFunction from 'lodash/isFunction';

import ButtonView, { ButtonViewProps } from './ButtonView';

/**
 * Props for the TextButton component
 * @interface ITextButton
 * @extends {Omit<ButtonViewProps, 'children'>}
 */
interface ITextButton extends Omit<ButtonViewProps, 'children'> {
    /** Text to display in the button */
    title: string;
    /** Whether the button should take full width */
    block?: boolean;
    /** Optional custom container styles or style function based on pressed state */
    containerStyle?: StyleProp<ViewStyle> | ((pressed: boolean) => StyleProp<ViewStyle>);
    /** Optional custom text styles */
    textStyle?: StyleProp<TextStyle>;
    /** Optional icon name */
    iconName?: string;
    /** Optional icon color */
    iconColor?: string;
    /** Function called when button is pressed */
    onPress: () => void;
}

/**
 * Text button component with optional icon and customizable styles
 * @component
 * @param {ITextButton} props - The props for the TextButton component
 * @returns {React.ReactElement} A styled text button
 *
 * @example
 * // Basic usage
 * <TextButton title="Click me" onPress={() => {}} />
 *
 * // With icon
 * <TextButton
 *   title="Settings"
 *   onPress={handleSettings}
 *   iconName="⚙️"
 * />
 *
 * // Full width button
 * <TextButton
 *   title="Full Width Button"
 *   onPress={handlePress}
 *   block
 * />
 *
 * // Custom styles
 * <TextButton
 *   title="Styled Button"
 *   onPress={handlePress}
 *   containerStyle={{
 *     paddingVertical: 12,
 *     paddingHorizontal: 24,
 *   }}
 *   textStyle={{
 *     fontSize: 18,
 *     fontWeight: 'bold',
 *   }}
 * />
 *
 * // With dynamic styles based on pressed state
 * <TextButton
 *   title="Dynamic Button"
 *   onPress={handlePress}
 *   containerStyle={(pressed) => ({
 *     opacity: pressed ? 0.5 : 1,
 *     transform: [{ scale: pressed ? 0.95 : 1 }],
 *   })}
 * />
 *
 * // With icon and custom color
 * <TextButton
 *   title="Custom Icon"
 *   onPress={handlePress}
 *   iconName="⭐"
 *   iconColor={Colors.accent}
 * />
 *
 * // Disabled state
 * <TextButton
 *   title="Disabled Button"
 *   onPress={handlePress}
 *   disabled
 * />
 */
const TextButton: FC<ITextButton> = ({
    onPress,
    title,
    containerStyle,
    textStyle,
    block,
    iconName,
    iconColor,
    ...rest
}) => {
    const getContainerStyle = (pressed: boolean): ViewStyle => ({
        ...styles.container,
        width: block ? '100%' : 'auto',
        opacity: pressed ? 0.7 : 1,
    });

    return (
        <ButtonView
            {...rest}
            onPress={onPress}
            style={({ pressed }) => {
                const baseStyle = getContainerStyle(pressed);
                const customStyle = lodashIsFunction(containerStyle) ? containerStyle(pressed) : containerStyle;
                return [baseStyle, customStyle].filter(Boolean) as StyleProp<ViewStyle>[];
            }}
        >
            {iconName && <Text style={[styles.icon, { color: iconColor || Colors.primary }]}>{iconName}</Text>}
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </ButtonView>
    );
};

export default TextButton;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(16),
        flexDirection: 'row',
    },
    text: {
        ...Fonts.Regular(16),
        color: Colors.primary,
        textAlign: 'center',
    },
    icon: {
        ...Fonts.Regular(16),
        marginRight: verticalScale(8),
    },
});
