import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByOrigin } from "../../redux/actions/messageActions";
import Template from "../Template";
class GeneralContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  sortMessagesForCharts(messages) {
    var data = []
    for (let i = 0; i < messages.length; i++) {
      const origin = {}
      origin['x'] = `${messages[i].name} ${messages[i].percentage}`
      origin['y'] = messages[i].total
      data.push(origin)
    }
    return data
  }

  render() {
    const filter = {
      type: 'origin',
      name: this.props.match.params.origin
    }
    return (
      <div>
        <Template title={"Origin stats"} filter={filter} />
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
    this.props.fetchMessagesByOrigin(this.props.match.params.origin);
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
    fetchMessagesByOrigin: origin => dispatch(fetchMessagesByOrigin(origin))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
