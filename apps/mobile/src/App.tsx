import { add } from "@lokshunhung/math/src/add";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export function App() {
    return (
        <View style={styles.container}>
            <Text>Open up src/App.tsx to start working on your app!</Text>
            <Text>1 + 1 = {add(1, 1)}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
