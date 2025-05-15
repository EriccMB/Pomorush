import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';
import './../../styles/theme.css';
import { RouterLink } from '../RouterLink';

export function Logo() {
  return (
    <div>
      <RouterLink href='/' className={styles.logoLinkBox}>
        <TimerIcon />
        <span>Pomorush</span>
      </RouterLink>
    </div>
  );
}
