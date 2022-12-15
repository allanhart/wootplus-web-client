import { include } from 'named-urls';

const paths = include('/', {
  index: '',
  about: 'about',

  error: include('', {
    critical: '500',
    nonCritical: '404',
  }),
});

export default paths;
