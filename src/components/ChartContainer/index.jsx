import React from "react";
import { connect } from "react-redux";
import {
  VictoryChart,
  VictoryBar,
  Bar,
} from "victory";

export default ({success, total, failed}) => (
          <VictoryChart
            // domainPadding={{ x: 50, y: [0, 20] }}
            domainPadding={25}
            alignment="start"
            scale={{ x: "linear" }}
          >
            <VictoryBar
              dataComponent={<Bar />}
              categories={{ x: ["Total", "Success", "Failed"] }}
              // style={{data: { fill: "" }}}
              style={{
                data: {
                  fill: d => d.fill,
                  opacity: d => d.opacity
                }
              }}
              data={[
                {
                  x: `Total`,
                  y: total,
                  label: total
                },
                {
                  x: `Success`,
                  y: success,
                  label: success
                },
                {
                  x: `Failed`,
                  y: failed,
                  label: failed,
                  fill: "tomato"
                }
              ]}
            />
          </VictoryChart>
    );
