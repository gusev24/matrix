const AppContacts = () => import('@/components/AppContacts')
const AppContactInfo = () => import('@/components/AppContactInfo')

const routes = [
  {
    path: '/',
    name: 'Book of contacts',
    component: AppContacts
  },
  {
    path: '/contact/:id',
    name: 'Contact information',
    component: AppContactInfo,
    params: true
  }
];

export default routes;
