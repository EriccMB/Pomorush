import styles from './styles.module.css'

type DefaultButton = {
  icon: React.ReactNode,
  color?: 'purple' | 'red',
} & React.ComponentProps<'button'>;

export function DefaultButton({ icon, color = 'purple', ...props }: DefaultButton) {
  return <button className={`${styles.button} ${styles[color]}`} {...props}>{icon}</button>;
}
