import { useEffect } from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens"
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "navigations/AppNavigator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: false,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
});

const App = () => {
  enableScreens(true);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

    // if (Config.STATUS === "PRODUCTION") {
    //   GlobalDebug(false, true);
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>

  )
}

export default App 