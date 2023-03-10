import { add } from "@lokshunhung/math/src/add";
import { Text } from "react-native";

interface Props {
    a: number;
    b: number;
}

export function MathDemo(props: Props) {
    const { a, b } = props;
    return (
        <Text>
            {a} + {b} = {add(a, b)}
        </Text>
    );
}
