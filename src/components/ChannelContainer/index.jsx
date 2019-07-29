import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByChannel } from "../../redux/actions/messageActions";
import Template from "../Template";
class GeneralContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const filter = {
      type: 'channel',
      name: this.props.match.params.channel
    }
    
    return (
      <div>
        <Template title={"Channel stats"} filter={filter} />
        {this.props.messages.length ?
          <div className='row'>
            <div className='col-6'>
              <ChartContainer
                success={this.props.success.length}
                failed={this.props.failed.length}
                total={this.props.messages.length}
              />
            </div>
          </div>
          :
          <div style={{ fontSize: '20px  ' }}>No se han encontrado mensajes...</div>
        }
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchMessagesByChannel(this.props.match.params.channel);
  }
}

const mapStateToProps = function (state) {
  return {
    success: state.messages.success,
    failed: state.messages.failed,
    messages: state.messages.list
  };
};
const mapDispatchToProps = function (dispatch) {
  return {
    fetchMessagesByChannel: channel => dispatch(fetchMessagesByChannel(channel))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
