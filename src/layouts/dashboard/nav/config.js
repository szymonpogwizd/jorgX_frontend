// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Szukaj miejsca',
    path: '/dashboard/search',
    icon: icon('chat_bubble_black_24dp')
  },
  {
    title: 'Dodaj opinię',
    path: '/dashboard/opinionForm',
    icon: icon('chat_bubble_black_24dp')
  },
  {
    title: 'Statystyki',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Kontakt',
    path: '/dashboard/contact',
    icon: icon('chat_bubble_black_24dp'),
  },
  {
    title: 'Użytkownicy',
    path: '/dashboard/users',
    icon: icon('people_black_24dp'),
  },
];

export default navConfig;
