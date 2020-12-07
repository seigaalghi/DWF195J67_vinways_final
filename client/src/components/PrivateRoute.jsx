import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
  return loading ? <Loading /> : <Route {...rest} render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />)} />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
