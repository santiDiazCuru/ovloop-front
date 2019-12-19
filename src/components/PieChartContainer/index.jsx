import React from "react";
import { VictoryPie } from "victory";

export default ({data, colorScale}) => (
    
            <svg viewBox="0 0 400 400" >
                <VictoryPie
                    colorScale={["333", "9C2921"]}
                    standalone={false}
                    data={data}
                    // innerRadius={50}
                    labelRadius={80}
                    style={{ labels: { fontSize: 10, fill: "white" } }}
                />
            </svg>

)
