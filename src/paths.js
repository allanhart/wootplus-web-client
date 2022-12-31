import { include } from 'named-urls';

const paths = include('/', {
  index: '',
  clearance: 'clearance',

  error: include('', {
    critical: '500',
    nonCritical: '404',
  }),
});

export default paths;
