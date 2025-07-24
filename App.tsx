
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/app/(tabs)/Home';
import FormComponent from './src/app/(tabs)/FormComponent';
import { IconButton } from 'react-native-paper';
import { NotesProvider } from './src/context/NotesContext';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }: any) => ({
            tabBarIcon: ({ color, size }: any) => {
              let iconName;

              if (route.name === 'Notas') {
                iconName = 'home-account';
              } else if (route.name === 'Agregar') {
                iconName = 'plus-circle-outline';
              }

              return (
                <IconButton icon={iconName} size={size} iconColor={color} />
              );
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: 'white',
          })}
        >
          <Tab.Screen name="Notas" component={Home} />
          <Tab.Screen name="Agregar" component={FormComponent} />
        </Tab.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}