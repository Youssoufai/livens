import { createStackNavigator } from "@react-navigation/stack";
import RequestsTabs from "./request";
import RequestDetails from "./requestDetails";

const Stack = createStackNavigator();

export default function RequestsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RequestsTabs" component={RequestsTabs} />
            <Stack.Screen name="RequestDetails" component={RequestDetails} />
        </Stack.Navigator>
    );
}
