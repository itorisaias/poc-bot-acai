import requireDirectory from 'require-directory';

const RoutesModules = requireDirectory(module, __dirname);

const Routes = Object.keys(RoutesModules).map(
  router => RoutesModules[router].index.default
);

export default Routes;
