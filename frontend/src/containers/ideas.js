import { connect } from 'react-redux';
import Ideas from '../components/Ideas';
import { getIdeas } from '../modules/ideas';

const mapStateToProps = state => {
  return {
    ideas: state.ideas,
    filters: state.filters,
  };
};

const mapDispatchToProps = dispatch => ({
  getIdeas: () => {
    dispatch(getIdeas());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ideas);
