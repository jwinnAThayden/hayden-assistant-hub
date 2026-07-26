import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { assistants } from './src/data/assistants';
import { backendSettings } from './src/config/backend';

export default function App() {
  const showBackendPanel = backendSettings.provider !== 'none';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Hayden Beverage</Text>
            <Text style={styles.title}>Assistant Hub</Text>
          </View>
          <Text style={styles.lead}>Open the right assistant from one mobile hub.</Text>
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

const assistantLogos: Partial<Record<string, ImageSourcePropType>> = {
  myassistant: require('./assets/agents/myAssistant.png'),
  mybenefits: require('./assets/agents/myBenefits.png'),
  mysupport: require('./assets/agents/ServiceDeskAgentMainIcon.png'),
  'industry-news': require('./assets/agents/HaydenIndustryNews.png'),
};

function AssistantCard({ assistant, featured = false }: { assistant: Assistant; featured?: boolean }) {
  const openAssistant = async () => {
    await WebBrowser.openBrowserAsync(assistant.url);
  };

  const logo = assistantLogos[assistant.id];

  return (
    <View style={[styles.card, featured && styles.featuredCard]}>
      <View style={styles.cardBody}>
        {logo ? (
          <Image source={logo} style={styles.agentLogo} resizeMode="contain" />
        ) : (
          <View style={styles.agentLogoFallback}>
            <Text style={styles.agentLogoFallbackText}>IT</Text>
          </View>
        )}
        <View style={styles.cardText}>
          {featured && <Text style={styles.featuredBadge}>Start here</Text>}
          <Text style={styles.cardTitle}>{assistant.name}</Text>
          <Text style={styles.cardLabel}>{assistant.label}</Text>
          <Text style={styles.cardDescription}>{assistant.description}</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={openAssistant}
          accessibilityRole="button"
          accessibilityLabel={`Open ${assistant.name}`}
        >
          <Text style={styles.buttonText}>Open</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f4ed',
  },
  page: {
    padding: 12,
    paddingBottom: 24,
    gap: 10,
  },
  header: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#cfab7b',
    backgroundColor: '#fffaf2',
    gap: 6,
  },
  eyebrow: {
    color: '#5b6680',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 3,
    color: '#102a5e',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 31,
  },
  lead: {
    color: '#34445f',
    fontSize: 14,
    lineHeight: 19,
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
    marginTop: 2,
  },
  sectionTitle: {
    color: '#102a5e',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#d8dce6',
    backgroundColor: '#ffffff',
    shadowColor: '#102a5e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  featuredCard: {
    borderColor: '#cfab7b',
    backgroundColor: '#fffdf8',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agentLogo: {
    width: 46,
    height: 46,
  },
  agentLogoFallback: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cfab7b',
    backgroundColor: '#fffaf2',
  },
  agentLogoFallbackText: {
    color: '#102a5e',
    fontSize: 16,
    fontWeight: '900',
  },
  cardText: {
    flex: 1,
    gap: 3,
  },
  cardLabel: {
    color: '#5b6680',
    fontSize: 13,
    fontWeight: '700',
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    color: '#102a5e',
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: '#ead6b8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: '#102a5e',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 23,
  },
  cardDescription: {
    color: '#34445f',
    fontSize: 14,
    lineHeight: 18,
  },
  button: {
    minWidth: 72,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102a5e',
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
});
