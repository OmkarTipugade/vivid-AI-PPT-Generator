export interface Slide {
  id: String;
  slideName: String;
  type: String;
  content: ContentItem;
  slideOrder: number;
  className: String;
}

export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "image"
  | "paragraph"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "title"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "divider"
  | "calloutBox"
  | "todoList"
  | "bulletList"
  | "codeBlock"
  | "customButton"
  | "tableOfContents";

export interface ContentItem {
  id: String;
  type: ContentType;
  name: String;
  content: ContentItem[] | String | String[] | String[][];
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: String;
  callOutType?: "success" | "warning" | "info" | "question" | "caution";
  link?: string;
  code?: string;
  language?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: 'light'|'dark';
}

export interface OutlineCard {
  id: string;
  title: string;
  order: number;
}