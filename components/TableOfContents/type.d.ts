export type TOCEntry = {
  level: number;
  text: string;
  slug: string;
  children: TOCEntry[];
};
