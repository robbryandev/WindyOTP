import { type ButtonProps, Pressable, Text } from "react-native";

export default function StyledButton(props: ButtonProps) {
    return (
        <Pressable {...props}>
            <Text className="text-txt">
                {props.title}
            </Text>
        </Pressable>
    )
}