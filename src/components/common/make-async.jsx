import MakeAsyncFunction from 'react-redux-promise-listener';
import { promiseListener } from '../../store';

class MakeAsync extends MakeAsyncFunction {
  static defaultProps = {
    listener: promiseListener,
    throwOnReject: false,
  };

  asyncFunctionWrapper = async (...args) => {
    try {
      return await this.state.asyncFunction.asyncFunction(...args);
    } catch (error) {
      if (this.props.throwOnReject) throw error;
      return error;
    }
  };

  render() {
    const { children } = this.props;
    const { asyncFunction } = this.state;
    return children && asyncFunction ? children(this.asyncFunctionWrapper) : null;
  }
}

export default MakeAsync;
