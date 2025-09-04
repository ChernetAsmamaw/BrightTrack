import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Header } from './components/Header';
import { useBrightTrackStore } from './store';
import { theme } from './theme';

export default function SettingsScreen() {
  const { refreshData } = useBrightTrackStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleRefreshData = async () => {
    await refreshData();
  };

  const settingsItems = [
    {
      icon: 'refresh',
      title: 'Refresh Data',
      subtitle: 'Update student performance data',
      action: 'button',
      onPress: handleRefreshData,
    },
    {
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Receive alerts for student progress',
      action: 'switch',
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      icon: 'theme-light-dark',
      title: 'Dark Mode',
      subtitle: 'Switch to dark theme',
      action: 'switch',
      value: darkModeEnabled,
      onValueChange: setDarkModeEnabled,
    },
    {
      icon: 'export',
      title: 'Export Data',
      subtitle: 'Download all student data',
      action: 'button',
      onPress: () => {},
    },
    {
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: 'button',
      onPress: () => {},
    },
    {
      icon: 'information',
      title: 'About',
      subtitle: 'App version and information',
      action: 'button',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <Header 
        title="Settings" 
        subtitle="App Configuration"
        showTeacherImage={false}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            {settingsItems.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <MaterialCommunityIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={theme.colors.primary} 
                  />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                {item.action === 'switch' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
                    thumbColor={item.value ? theme.colors.primary : theme.colors.textSecondary}
                  />
                ) : (
                  <TouchableOpacity onPress={item.onPress}>
                    <MaterialCommunityIcons 
                      name="chevron-right" 
                      size={24} 
                      color={theme.colors.textTertiary} 
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Export</Text>
            {settingsItems.slice(3, 4).map((item, index) => (
              <View key={index} style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <MaterialCommunityIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={theme.colors.info} 
                  />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <TouchableOpacity onPress={item.onPress}>
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={24} 
                    color={theme.colors.textTertiary} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            {settingsItems.slice(4).map((item, index) => (
              <View key={index} style={styles.settingItem}>
                <View style={styles.settingIcon}>
                  <MaterialCommunityIcons 
                    name={item.icon as any} 
                    size={24} 
                    color={theme.colors.warning} 
                  />
                </View>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <TouchableOpacity onPress={item.onPress}>
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={24} 
                    color={theme.colors.textTertiary} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>BrightTrack v1.0.0</Text>
            <Text style={styles.footerSubtext}>Empowering teachers to track student progress</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  settingSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  footerSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
  },
});
