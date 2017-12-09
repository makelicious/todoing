import { connect } from 'react-redux';
import Ideas from '../components/Ideas';

const mapStateToProps = state => {
  return {
    ideas: state.ideas,
  };
};

export default connect(mapStateToProps)(Ideas);
