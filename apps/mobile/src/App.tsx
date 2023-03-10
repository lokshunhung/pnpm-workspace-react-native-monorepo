import { MathDemo } from "@lokshunhung/ui/src/MathDemo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export function App() {
    return (
        <View style={styles.container}>
            <Text>Open up src/App.tsx to start working on your app!</Text>
            <MathDemo a={1} b={1} />
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
