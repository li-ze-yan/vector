export type Theme = "light" | "dark" | "system" | null;

export type IBaseSystem = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
