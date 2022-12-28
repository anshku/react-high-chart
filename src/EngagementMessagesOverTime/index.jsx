import React from "react";

//HighChart Imports
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

//Constants
import { messageCountList, channels } from "../EngagementHelper";


const EngagementMessagesOverTime = () => {
  const getValue = React.useMemo(() => {
    //here this ensures us to have updated data structure for channels
    for (let i = 0; i < channels.length; i++) {
      for (let j = 0; j < messageCountList.length; j++) {
        if (channels[i].id === messageCountList[j].channelId) {
          channels[i]["messages"].push(messageCountList[j]);
        }
      }
    }
    //here we are assigning messages to our channels data
    channels.map((item) => {
      if ((item.messages && item.messages.length === 0) || !item.messages)
        return (item["messages"] = 0);
      else {
        return Array.from(new Set(item.messages.map((item) => item.channelId)));
      }
    });
    return channels;
  }, [channels]);

  //getting messages
  const messages = getValue.map((item) => item.messages);

  //getting channel with highest messages
  const getHighestChannelsMessages = messages.find((item, index) => {
    return item.length > 0 ? item : null;
  });

  //generating data for high chart with message counts and timestamps
  const data = getHighestChannelsMessages.map((item) => {
    const timestamp = new Date(item.timeBucket);
    return [timestamp.getTime(), parseInt(item.count)];
  });

  //creating options for high chart
  const options = {
    chart: {
      type: "spline",
      backgroundColor: "#0c0b0f",
    },
    title: {
      text: "My chart",
    },
    tooltip: {
      border: "solid 1px #00948f",
      backgroundColor: "#0c0b0f",

      style: {
        color: "white",
        fontSize: "15px",
      },
    },

    xAxis: {
      type: "datetime",
      min: Date.parse("2022-10-10 00:00:0"),
      max: Date.parse("2022-10-25 12:14:0"),
      labels: {
        formatter: function() {
          return Highcharts.dateFormat("%e %b", this.value);
        },
      },
    },
    time: {
      useUTC: false,
    },
    yAxis: {
      gridLineColor: "transparent",
    },
    series: [
      {
        data: [...data],
        name: "messages",
      },
    ],
  };

  //returning high chart component
  return (
    <React.Fragment>
      <div className="react-box-auto">
        <h3>React HighChart</h3>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </React.Fragment>
  );
};

export default EngagementMessagesOverTime;
