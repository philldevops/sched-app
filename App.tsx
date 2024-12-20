import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './routes/routes';
import { LogBox } from 'react-native';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from './cache';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead'
]);

export default function App() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
