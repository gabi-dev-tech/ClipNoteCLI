
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/app/(tabs)/Home';
import FormComponent from './src/app/(tabs)/FormComponent';
import { IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
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

            return <IconButton icon={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Notas" component={Home} />
        <Tab.Screen name="Agregar" component={FormComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}