import { type ViewProps, type TextProps, type ButtonProps } from 'react-native';

declare module 'react-native' {
    interface ViewProps {
        className?: string;
    }
    interface TextProps {
        className?: string;
    }
    interface ButtonProps {
        className?: string;
    }
    interface TouchableOpacityProps {
        className?: string;
    }
}