import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

const AdminRoute = ({ component: Component, auth: { loading, isAuthenticated, user }, ...rest }) => {
  return loading ? (
    <Loading />
  ) : (
    <Route {...rest} render={(props) => (user.admin && isAuthenticated ? <Component {...props} /> : <Redirect to='/' />)} />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminRoute);
