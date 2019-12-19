import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByChannel } from "../../redux/actions/messageActions";
import Template from "../Template";
import PieChart from '../PieChartContainer'
import LineChartContainer from '../LineChartContainer'
import StatsTableContainer from '../StatsTableContainer'
class GeneralContainer extends React.Component {
  constructor() {
    super();
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
  sortMessagesForLineChart(arrayOfOrigins) {
    const data = arrayOfOrigins.map(origin => {
      return [origin.name, origin.list]
    })
    return data
  }
  sortMessagesForPieChart(messages) {
    var data = []
    const statuses = {}
    for (let i = 0; i < messages.length; i++) {
      statuses[messages[i].status] = statuses[messages[i].status] || 0
      statuses[messages[i].status] = statuses[messages[i].status] + 1
    }
    for (const key in statuses) {
      data.push({ x: `${key} ${Math.round((statuses[key] / messages.length) * 100)} %`, y: statuses[key] })
    }
    return data
  }

  render() {
    const data = this.sortMessagesForCharts(this.props.origins)
    const filter = {
      type: 'channel',
      name: this.props.match.params.channel
    }
    const data2 = this.sortMessagesForLineChart(this.props.origins)
    const data3 = this.sortMessagesForPieChart(this.props.messages)
    return (
      <div>
        <Template title={"Channel stats"} filter={filter} />
        {this.props.messages.length ?
          <div className='row'>
            <div className='col-6'>
              <LineChartContainer
                originArray={data2} title={`origin for ${this.props.match.params.channel}`}
              />
            </div>
            <div className='col-6'>
              <div className='row'>
                <div className='col-9 ' style={{ textAlign: 'center', width: '80%', paddingTop: '15px'}}>
                  <StatsTableContainer title={this.props.channels[0].name} data={this.props.channels} />
                </div>
              </div>
              <div className='row'>
                <div className='col-9' style={{width: '70%', height: '70%'}}>
                  <PieChart
                    data={data3}
                  />
                </div>
              </div>
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
    messages: state.messages.list,
    origins: state.messages.origins,
    channels: state.messages.channels
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
