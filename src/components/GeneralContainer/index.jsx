import React from "react";
import Template from "../Template";
import { connect } from "react-redux";
import { fetchMessages } from "../../redux/actions/messageActions";
import ChartContainer from "../ChartContainer";
import PieChart from '../PieChartContainer';
import StatsTable from '../StatsTableContainer'
import LineChartContainer from '../LineChartContainer'

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


  render() {
    const filter = null
    const origins = this.sortMessagesForCharts(this.props.origins)
    const originArray = this.sortMessagesForLineChart(this.props.origins)
    const channelArray = this.sortMessagesForLineChart(this.props.channels)
    console.log('soy originarray', originArray)

    return (
      <div>
        <Template title={"General stats"} filter={filter} />
        {this.props.messages.length ?
          <div className='container'>
            <div className='row'>
              <div className='col-6'>
                <LineChartContainer originArray={originArray} title={'origin'}/>
                {/* <ChartContainer
                  success={this.props.success.length}
                  failed={this.props.failed.length}
                  total={this.props.messages.length} /> */}
              </div>
              <div className='col-6'>
              <LineChartContainer originArray={channelArray} title={'channel'}/>
                {/* <StatsTable title={'Origin'} data={this.props.origins} /> */}
                {/* <PieChart data={origins} /> */}
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                {/* <PieChart data={origins} /> */}
                <StatsTable title={'Origin'} data={this.props.origins} />
              </div>
              <div className='col-6'>
                <StatsTable title={'Channel'} data={this.props.channels} />
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
    this.props.fetchMessages();
  }
}

const mapStateToProps = function (state) {
  return {
    success: state.messages.success,
    failed: state.messages.failed,
    messages: state.messages.list,
    origins: state.messages.origins,
    channels: state.messages.channels,
  };
};
const mapDispatchToProps = function (dispatch) {
  return {
    fetchMessages: () => dispatch(fetchMessages())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
