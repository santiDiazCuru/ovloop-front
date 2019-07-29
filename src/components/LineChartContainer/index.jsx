import React from 'react'
import LineChart from './LineChart'
import { connect } from "react-redux";

class LineChartContainer extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    sortMessages(list) {
        let sortedMessages = {}
        let messages = list
        for (let i = 0; i < messages.length; i++) {
            let date = messages[i].date.slice(0, 10)
            let [year, month, day] = date.split('-')
            year = 'Y' + year
            if (month == '01') month = '1-jan';
            if (month == '02') month = '2-feb';
            if (month == '03') month = '3-mar';
            if (month == '04') month = '4-apr';
            if (month == '05') month = '5-may';
            if (month == '06') month = '6-jun';
            if (month == '07') month = '7-jul';
            if (month == '08') month = '8-aug';
            if (month == '09') month = '9-sep';
            if (month == '10') month = '10-oct';
            if (month == '11') month = '11-nov';
            if (month == '12') month = '12-dec';
            const [x, monthName] = month.split('-')
            sortedMessages[year] = sortedMessages[year] || {}
            sortedMessages[year][month] = sortedMessages[year][month] || {}
            sortedMessages[year][month][month + '-week1'] = sortedMessages[year][month][month + '-week1'] || { x: monthName + '-week1', y: 0 };
            sortedMessages[year][month][month + '-week2'] = sortedMessages[year][month][month + '-week2'] || { x: monthName + '-week2', y: 0 };
            sortedMessages[year][month][month + '-week3'] = sortedMessages[year][month][month + '-week3'] || { x: monthName + '-week3', y: 0 };
            sortedMessages[year][month][month + '-week4'] = sortedMessages[year][month][month + '-week4'] || { x: monthName + '-week4', y: 0 };
            sortedMessages[year][month]['total'] = sortedMessages[year][month]['total'] || { x: monthName, y: 0 }
            sortedMessages[year][month]['total'].y = sortedMessages[year][month]['total'].y + 1;


            if (day <= 7) {
                sortedMessages[year][month][month + '-week1'].y += 1
            }
            if (day > 7 && day <= 14) {
                sortedMessages[year][month][month + '-week2'].y += 1
            }
            if (day > 14 && day <= 21) {
                sortedMessages[year][month][month + '-week3'].y += 1
            }
            if (day > 21) {
                sortedMessages[year][month][month + '-week4'].y += 1
            }
        }
        return sortedMessages

    }

    arrangeDataForChart(msgObject, list) {
        if (Object.keys(msgObject).length) {
            if (Object.keys(msgObject).length == 1) { //el objeto tiene solo un año de mensajes   
                const firstKey = Object.keys(msgObject)[0]
                var msgsByMonth = msgObject[firstKey] //msgs by month tiene todos los mensajes por mes y semana
            }
            if (Object.keys(msgsByMonth).length > 1 && Object.keys(msgsByMonth).length <= 3) {
                var unsortedDataByMonth = [];
                var sortedDataByMonth = [];
                for (const month in msgsByMonth) {
                    unsortedDataByMonth.push(msgsByMonth[month])
                }
                //Sort
                for (let i = 1; i <= 12; i++) {
                    for (let j = 0; j < unsortedDataByMonth.length; j++) {
                        if (unsortedDataByMonth[j]) {
                            var key = Object.keys(unsortedDataByMonth[j])[0]
                            var [month, nA, NA] = key.split('-')
                            if (month == i) {
                                sortedDataByMonth.push(unsortedDataByMonth[j])
                            }
                        }
                    }
                }
                var dataForChart = []
                for (let i = 0; i < sortedDataByMonth.length; i++) {
                    for (const key in sortedDataByMonth[i]) {
                        if (key != 'total') {
                            dataForChart.push(sortedDataByMonth[i][key])
                        }
                    }
                }
                return dataForChart
            }
            if (Object.keys(msgsByMonth).length > 3) {
                var unsortedDataByMonth = [];
                var sortedDataByMonth = [];
                for (const month in msgsByMonth) {
                    unsortedDataByMonth.push(msgsByMonth[month])
                }
                //Sort
                for (let i = 1; i <= 12; i++) {
                    for (let j = 0; j < unsortedDataByMonth.length; j++) {
                        if (unsortedDataByMonth[j]) {
                            var key = Object.keys(unsortedDataByMonth[j])[0]
                            var [month, nA, NA] = key.split('-')
                            if (month == i) {
                                sortedDataByMonth.push(unsortedDataByMonth[j])
                            }
                        }
                    }
                }
                var dataForChart = []
                for (let i = 0; i < sortedDataByMonth.length; i++) {
                    for (const key in sortedDataByMonth[i]) {
                        if (key == 'total') {
                            dataForChart.push(sortedDataByMonth[i][key])
                        }
                    }
                }
                return dataForChart
            }
            if (Object.keys(msgsByMonth).length == 1) {
                var messagesByDay = {}
                var messages = list;
                for (let i = 0; i < messages.length; i++) {
                    let day = messages[i].date.slice(8, 10)
                    messagesByDay[day] = messagesByDay[day] || { x: day, y: 0 }
                    messagesByDay[day].y = messagesByDay[day].y + 1
                }
                var sortedDataByDay = [];
                for (let i = 1; i <= 31; i++) {
                    for (const day in messagesByDay) {
                        if (day == i) {
                            sortedDataByDay.push(messagesByDay[day])
                        }
                    }
                }
                return sortedDataByDay
            }
        }
    }
    arrangeMultipleDatasetsForChart(arrayOfManyOrigins) {
        if (this.props.originArray) {
            const colorScale = ["#d00808", "#fcb268", "#8c9535", "#334660"]
            var cont = 0
            const data = arrayOfManyOrigins.map(origin => {
                const dataSet = [origin[0], this.arrangeDataForChart(this.sortMessages(origin[1]), origin[1]), colorScale[cont]]
                cont = cont + 1
                return dataSet

            })
            return data
        }
        else return false
    }

    getNamesForLabels(arrrayOfManyOrigins){
        if (this.props.originArray) {
            const colorScale = ["#d00808", "#fcb268", "#8c9535", "#334660"]
            var cont = 0
            const data = arrayOfManyOrigins.map(origin => {
                const dataSet = [origin[0], colorScale[cont]]
                cont = cont + 1
                return dataSet
            })
            return data
        }
        return false
    }

    setVerticalDomain() {
        if (this.props.to && this.props.from && this.props.messages) {
            var [smth, monthFrom, smthelse] = this.props.from.split('-');
            var [smth1, monthTo, smthelse1] = this.props.from.split('-');
            if (monthFrom == monthTo) {
                return this.props.messages.length/4
            }
            else {
                let sum = 0;
                this.props.origins.map(origin => {
                    sum = sum + origin.total
                })
                return sum / origins.length
            }
        }
        return this.props.messages.length / 6
    }


    render() {

        const data = this.arrangeMultipleDatasetsForChart(this.props.originArray)
        const domain = this.setVerticalDomain()
        const tags = data.map(dataset=>{return {name: dataset[0]}})
        console.log('soy datataaa', data)
        return (

            <LineChart data={data} domain={domain} tags={tags} title={this.props.title}/>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        success: state.messages.success,
        failed: state.messages.failed,
        messages: state.messages.list,
        to: state.date.to,
        from: state.date.from,
        origins: state.messages.origins
    };
};

export default connect(
    mapStateToProps,
    null
)(LineChartContainer);
