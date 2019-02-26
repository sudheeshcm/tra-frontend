import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import BuyerRequestForm from './component';

const mapStateToProps = state => ({
  buyerId: 123456 || state.currentUser.id,
});

const mapDispatchToProps = dispatch => ({
  push: args => dispatch(push(args)),
  updateStep: dispatch.app.updateStep,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerRequestForm);
