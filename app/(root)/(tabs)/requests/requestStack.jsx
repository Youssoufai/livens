import { createStackNavigator } from "@react-navigation/stack";
import RequestDetails from "./requestDetails";
import RequestsTabs from "./requestStack";

const Stack = createStackNavigator();

export default function RequestsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RequestsTabs" component={RequestsTabs} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} />
        </Stack.Navigator>
    );
}
