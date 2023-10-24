import { type ButtonProps, Pressable, Text } from "react-native";

export function StyledButton(props: ButtonProps) {
    return (
        <Pressable {...props}>
            <Text className={props.text_className + " text-txt"}>
                {props.title}
            </Text>
        </Pressable>
    )
}