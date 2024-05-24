// component
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const userRole = localStorage.getItem('userType');

const navConfig = [
  {
    title: 'Szukaj miejsca',
    path: '/dashboard/search',
    icon: icon('place')
  },
  {
    title: 'Dodaj opinię',
    path: '/dashboard/opinionForm',
    icon: icon('opinion')
  },
  {
    title: 'Statystyki',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Kontakt',
    path: '/dashboard/contact',
    icon: icon('contact'),
  },
  ...(userRole === 'ADMINISTRATOR' ? [
    {
      title: 'Użytkownicy',
      path: '/dashboard/users',
      icon: icon('people_black_24dp'),
    },
    {
      title: userRole,
      path: '/dashboard/Places',
      icon: icon('edit-place'),
    },
  ] : []),
];


export default navConfig;



