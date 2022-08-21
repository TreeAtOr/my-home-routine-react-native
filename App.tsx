import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main } from './src/Main';
const queryClient = new QueryClient()
const Stack = createNativeStackNavigator();
export default function App() {
  return (<QueryClientProvider client={queryClient}>
    <Main />    
  </QueryClientProvider>)
}

