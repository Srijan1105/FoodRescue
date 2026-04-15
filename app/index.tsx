// Powered by OnSpace.AI
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (user?.role === 'donor') return <Redirect href="/(donor)/" />;
  if (user?.role === 'ngo') return <Redirect href="/(ngo)/" />;
  if (user?.role === 'volunteer') return <Redirect href="/(volunteer)/" />;

  return <Redirect href="/onboarding" />;
}
