export type ButtonVariant = 'primary' | 'ghost';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-bold transition duration-200 motion-safe:hover:-translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-accent text-accent-ink hover:bg-accent-hover',
  ghost: 'border-line text-mist hover:border-line-strong hover:bg-mist/5',
};

export function buttonClass(variant: ButtonVariant): string {
  return `${base} ${variants[variant]}`;
}
