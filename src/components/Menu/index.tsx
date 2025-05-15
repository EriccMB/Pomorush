import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { RouterLink } from '../RouterLink';

type AvaibleThemes = 'dark' | 'light';
export function Menu() {
  const [theme, setTheme] = useState<AvaibleThemes>(() => {
    const storageTheme =
      (localStorage.getItem('theme') as AvaibleThemes) || 'dark';
    return storageTheme;
  });

  //                                tem que tipar o evento na função
  const handleThemeChange = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // ISSO FAZ COM QUE NAO EXECUTE O EVENTO PADRAO DO ELEMENTO, NO CASO, SERIA O href
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // SALVA O TEMA ATUAL NO localStorage
    localStorage.setItem('theme', theme);
    // FUNÇÃO DE cleanUp, PARA NÃO DEIXAR LIXO NA TELA
    // TODA QUE FOR CHAMADO O useEffect, ANTES ELE LIMPA O LIXO QUE DEIXOU
    // NA RENDERIZAÇÃO ANTERIOR, DEIXANDO O SISTEMA MAIS LEVE
    return () => {};
  }, [theme]);

  // CONDIÇÃO SE ESTIVER CLARO APARECE A LUA, E SE ESTIVER DARK APARECE O SOL
  // INVÉS DE FAZER IF, FAZER ASSIM, É MAIS LIMPO
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };
  return (
    <nav className={styles.menuBox}>
      <RouterLink href='/' aria-label='Ir para a home' title='Ir para a home'>
        <HouseIcon />
      </RouterLink>
      <RouterLink href='/history' aria-label='Ver histórico' title='Ver histórico'>
        <HistoryIcon />
      </RouterLink>
      <RouterLink href='/config' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href='#'
        aria-label='Mudar tema'
        title='Mudar tema'
        onClick={handleThemeChange}
      >
        {/*PASSA O THEME COMO PARÂMETRO NO OBJETO */}
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
