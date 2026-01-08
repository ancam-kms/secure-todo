import { AuthenticateUser } from '../../../application/usecases/auth/commands/authenticate';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

type Props = {
  authenticateUser: AuthenticateUser;
  onAuthenticated: () => void;
};

const AuthScreen: React.FC<Props> = ({ authenticateUser, onAuthenticated }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async () => {
    setLoading(true);
    setError(null);

    try {
      const success = await authenticateUser.execute();
      if (success) {
        onAuthenticated();
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (e) {
      setError('Authentication error occurred.', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Authenticating...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure TODO App</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
