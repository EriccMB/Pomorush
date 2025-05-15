import { RouterLink } from '../RouterLink';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='https://portfolioericmorais.netlify.app/' target='blank'>Eric Morais &copy; - Portifólio</RouterLink>
    </footer>
  );
}
