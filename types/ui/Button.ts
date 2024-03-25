export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "default" | "primary" | "secondary";
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Optional class name overrides
   */
  className?: string;
}
