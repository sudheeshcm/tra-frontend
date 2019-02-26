import { connect } from 'react-redux';

import Networks from './component';

const mapStateToProps = state => ({
  loading: state.networks.loading,
  networks: state.networks.items,
});

export default connect(
  mapStateToProps,
  null,
)(Networks);
