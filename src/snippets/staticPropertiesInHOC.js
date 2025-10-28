// role is a static property
function AdminPanel() {
  return <h1>Admin Only</h1>;
}
AdminPanel.role = 'admin';

function UserPanel() {
  return <h1>User Dashboard</h1>;
}
UserPanel.role = 'user';

const routes = [AdminPanel, UserPanel];

const filteredRoutes = routes.filter(
  (Component) => Component.role === currentUser.role
);

// to preserve such properties need to use hoistNonReactStatics

import hoistNonReactStatics from 'hoist-non-react-statics';

function withAudit(Component) {
  function Wrapped(props) {
    useAuditTrail(props.userId);
    return <Component {...props} />;
  }

  hoistNonReactStatics(Wrapped, Component);
  return Wrapped;
}
