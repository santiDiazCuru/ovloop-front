import React from "react";
import { VictoryPie } from "victory";

export default ({data}) => (
    <div className='row'>
        <div className="col-9">
            <svg viewBox="0 0 400 400" >
                <VictoryPie
                    colorScale={["#d00808", "#fcb268", "#8c9535", "#334660"]}
                    standalone={false}
                    data={data}
                    // innerRadius={50}
                    labelRadius={80}
                    style={{ labels: { fontSize: 10, fill: "black" } }}
                />
            </svg>
        </div>
    </div>
)
