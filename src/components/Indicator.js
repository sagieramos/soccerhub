import { BallTriangle } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Indicator = ({ isVisible, wrapperClass }) => (
  <BallTriangle
    height={50}
    width={50}
    radius={4}
    color="#fff"
    ariaLabel="ball-triangle-loading"
    wrapperClass={wrapperClass}
    wrapperStyle=""
    visible={isVisible}
  />
);

Indicator.defaultProps = {
  isVisible: true,
  wrapperClass: 'indicator',
};

Indicator.propTypes = {
  isVisible: PropTypes.bool,
  wrapperClass: PropTypes.string,
};

export default Indicator;
