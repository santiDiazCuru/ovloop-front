import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryStack, VictoryTheme, VictoryLegend } from "victory";

export default ({ data, domain, tags, title }) => (
    
    <VictoryStack >
        {domain ?
            <VictoryChart domain={{ y: [0, domain] }} theme={VictoryTheme.material} >

                {data.map(origin => {
                    return (<VictoryLine
                        interpolation='natural'
                        data={origin[1]}
                        style={{
                            data: { stroke: origin[2] }
                        }}
                    />
                    )
                })}
                 <VictoryLegend x={80} y={10}
                    title = {`Messages by ${title}`}
                    orientation="horizontal"
                    gutter={10}
                    itemsPerRow={2}
                    colorScale={["#d00808", "#fcb268", "#8c9535", "#334660"]}
                    style={{
                        labels: { fontSize: 10 },
                        border: { stroke: "black" },
                        title: {fontSize: 20 }
                      }}
                    data={tags}
                />
                <VictoryAxis style={{ tickLabels: { angle: 325, fontSize: '9px' } }} />
                <VictoryAxis dependentAxis />
            </VictoryChart>
            :
            <VictoryChart >

                {data.map(origin => {
                    return (<VictoryLine
                        interpolation='natural'
                        data={origin[1]}
                        style={{
                            data: { stroke: origin[2] }
                        }}
                    />
                    )
                })}
                <VictoryLegend x={125} y={10}
                    orientation="horizontal"
                    gutter={10}
                    itemsPerRow={2}
                    colorScale={["#d00808", "#fcb268", "#8c9535", "#334660"]}
                    style={{
                        labels: { fontSize: 10 },
                        border: { stroke: "black" },
                        title: {fontSize: 20 }
                      }}
                    data={tags}
                />
                <VictoryAxis style={{ tickLabels: { angle: 325, fontSize: '9px' } }} />
                <VictoryAxis dependentAxis />
            </VictoryChart>
        }
    </VictoryStack>
)