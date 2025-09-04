import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

interface TabItem {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
  label: string;
}

const tabs: TabItem[] = [
  {
    name: 'overview',
    icon: 'view-dashboard',
    route: '/',
    label: 'Overview',
  },
  {
    name: 'students',
    icon: 'account-group',
    route: '/students',
    label: 'Students',
  },
  {
    name: 'analytics',
    icon: 'chart-line',
    route: '/analytics',
    label: 'Analytics',
  },
  {
    name: 'settings',
    icon: 'cog',
    route: '/settings',
    label: 'Settings',
  },
];

export const BottomTabNavigator: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (route: string) => {
    if (route !== pathname) {
      router.push(route);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.route;
          
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab.route)}
              accessibilityLabel={`Navigate to ${tab.label}`}
              accessibilityRole="button"
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={24}
                  color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                />
              </View>
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  tabBar: {
    flexDirection: 'row',
    height: theme.layout.tabBarHeight,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  activeIconContainer: {
    backgroundColor: theme.colors.primaryLight + '20',
  },
  label: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
