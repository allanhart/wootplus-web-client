import { include } from 'named-urls';

const paths = include('/', {
  index: '',
  clearance: 'clearance',
  electronics: 'electronics',

  error: include('', {
    critical: '500',
    nonCritical: '404',
  }),
});

export default paths;
