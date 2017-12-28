import LogoETH from '../../assets/img/icons/ETH.svg';
import LogoBTC from '../../assets/img/icons/BTC.svg';
import LogoBCH from '../../assets/img/icons/BCH.svg';
import LogoDASH from '../../assets/img/icons/DASH.svg';
import LogoETC from '../../assets/img/icons/ETC.svg';
import LogoLTC from '../../assets/img/icons/LTC.svg';
import LogoZEC from '../../assets/img/icons/ZEC.svg';
import LogoXRP from '../../assets/img/icons/XRP.svg';
import LogoXMR from '../../assets/img/icons/XMR.svg';
import LogoDOGE from '../../assets/img/icons/DOGE.svg';
import LogoWAVES from '../../assets/img/icons/WAVES.svg';
import LogoKICK from '../../assets/img/icons/KICK.svg';
import LogoUSDT from '../../assets/img/icons/USDT.svg';

import styles from './styles.less'; // Failed to make it work with .scss

export function getIcon(currencyName, style={}) {
  let LogoComponent = null;
  switch (currencyName) {
    case 'ETH':
      LogoComponent = LogoETH;
      break;

    case 'BTC':
      LogoComponent = LogoBTC;
      break;

    case 'DASH':
      LogoComponent = LogoDASH;
      break;

    case 'ETC':
      LogoComponent = LogoETC;
      break;

    case 'LTC':
      LogoComponent = LogoLTC;
      break;

    case 'ZEC':
      LogoComponent = LogoZEC;
      break;

    case 'XRP':
      LogoComponent = LogoXRP;
      break;

    case 'XMR':
      LogoComponent = LogoXMR;
      break;

    case 'DOGE':
      LogoComponent = LogoDOGE;
      break;

    case 'WAVES':
      LogoComponent = LogoWAVES;
      break;

    case 'KICK':
      LogoComponent = LogoKICK;
      break;

    case 'USDT':
      LogoComponent = LogoUSDT;
      break;

    case 'BCH':
      LogoComponent = LogoBCH;
      break;

    default:
      return '';
  }
  return <LogoComponent className={styles.svgLogo} style={style} />;
}
