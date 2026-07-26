import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { assistants } from './src/data/assistants';
import { backendSettings } from './src/config/backend';

export default function App() {
  const showBackendPanel = backendSettings.provider !== 'none';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Hayden Beverage</Text>
          <Text style={styles.title}>Assistant Hub</Text>
          <Text style={styles.lead}>
            A mobile starting point for Hayden employees to open the right assistant on iPhone or Android.
          </Text>
        </View>

        {showBackendPanel && (
          <View style={styles.backendPanel}>
            <Text style={styles.panelLabel}>Backend services</Text>
            <Text style={styles.panelText}>{backendSettings.summary}</Text>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>General assistant</Text>
        </View>

        {assistants.filter((assistant) => assistant.featured).map((assistant) => (
          <AssistantCard key={assistant.id} assistant={assistant} featured />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Individual agents</Text>
        </View>

        {assistants.filter((assistant) => !assistant.featured).map((assistant) => (
          <AssistantCard key={assistant.id} assistant={assistant} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

type Assistant = typeof assistants[number];

function AssistantCard({ assistant, featured = false }: { assistant: Assistant; featured?: boolean }) {
  const openAssistant = async () => {
    await WebBrowser.openBrowserAsync(assistant.url);
  };

  return (
    <View style={[styles.card, featured && styles.featuredCard]}>
      <View style={styles.cardTopline}>
        <Text style={styles.cardLabel}>{assistant.label}</Text>
        <Text style={styles.cardBadge}>{assistant.platform}</Text>
      </View>
      <Text style={styles.cardTitle}>{assistant.name}</Text>
      <Text style={styles.cardDescription}>{assistant.description}</Text>
      <View style={styles.bulletList}>
        {assistant.helpAreas.map((helpArea) => (
          <Text key={helpArea} style={styles.bulletItem}>- {helpArea}</Text>
        ))}
      </View>
      <Pressable style={styles.button} onPress={openAssistant} accessibilityRole="button">
        <Text style={styles.buttonText}>Open {assistant.name}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f4ed',
  },
  page: {
    padding: 18,
    paddingBottom: 36,
    gap: 16,
  },
  header: {
    padding: 22,
    borderWidth: 1,
    borderColor: '#cfab7b',
    backgroundColor: '#fffaf2',
  },
  eyebrow: {
    color: '#5b6680',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 8,
    color: '#102a5e',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
  },
  lead: {
    marginTop: 12,
    color: '#34445f',
    fontSize: 16,
    lineHeight: 23,
  },
  backendPanel: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#d8dce6',
    backgroundColor: '#ffffff',
  },
  panelLabel: {
    color: '#102a5e',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  panelText: {
    marginTop: 6,
    color: '#34445f',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    color: '#102a5e',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  card: {
    gap: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8dce6',
    backgroundColor: '#ffffff',
    shadowColor: '#102a5e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
  },
  featuredCard: {
    borderColor: '#cfab7b',
    backgroundColor: '#fffdf8',
  },
  cardTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardLabel: {
    flex: 1,
    color: '#5b6680',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  cardBadge: {
    color: '#102a5e',
    fontSize: 12,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#102a5e',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 31,
  },
  cardDescription: {
    color: '#34445f',
    fontSize: 15,
    lineHeight: 21,
  },
  bulletList: {
    gap: 6,
  },
  bulletItem: {
    color: '#5b6680',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    marginTop: 4,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102a5e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
});
