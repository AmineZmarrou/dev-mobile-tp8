import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import AppStack from "./navigation/AppStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppStack />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
