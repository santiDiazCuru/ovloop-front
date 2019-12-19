import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByOrigin } from "../../redux/actions/messageActions";
import Template from "../Template";
import PieChart from '../PieChartContainer'
import LineChartContainer from '../LineChartContainer'
import StatsTableContainer from '../StatsTableContainer'

// import LineChartContainer from '../LineChartContainer'
// import StatsTableContainer from '../StatsTableContainer'

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
    const data = this.sortMessagesForCharts(this.props.channels)
    const filter = {
      type: 'origin',
      name: this.props.match.params.origin
    }
    const data2 = this.sortMessagesForLineChart(this.props.channels)
    const data3 = this.sortMessagesForPieChart(this.props.messages)
    return (
      <div>
        <Template title={"Origin stats"} filter={filter} />
        {this.props.messages.length ?
          <div className='row'>
            <div className='col-6'>
              <LineChartContainer
                originArray={data2} title={`origin for ${this.props.match.params.origin}`}
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
    this.props.fetchMessagesByOrigin(this.props.match.params.origin);
  }
}

const mapStateToProps = function (state) {
  return {
    success: state.messages.success,
    failed: state.messages.failed,
    messages: state.messages.list,
    channels: state.messages.channels,
    origins: state.messages.origins
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
