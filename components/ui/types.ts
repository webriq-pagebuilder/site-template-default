export interface IFormElements {
  name: string;
  ariaLabel: string;
  className?: string;
  isRequired?: boolean;
  [key: string]: any;
}

export type StyleVariants<T extends string> = Record<T, string>;
