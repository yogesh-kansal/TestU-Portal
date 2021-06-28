import React, { Component } from 'react';
import './test_style.css'

class Timer extends Component {

    state = {
        currentTime:  20*1000
      };

    componentDidMount() {
        let timer = setInterval(() => {
            const newTime = this.state.currentTime - 10;
            if (newTime > 0) {
              this.setState({
                currentTime: newTime
              });
            } else {
              clearInterval(timer);
              this.props.timeUp();
            }
          }, 10);
    }


    render() {

        const { currentTime} = this.state;
        let seconds = ("0" + (Math.floor((currentTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((currentTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor((currentTime / 3600000) % 100)).slice(-2);
    
        return (
            <div className="time">
                {hours} : {minutes} : {seconds}
            </div>
        );
    }
}

export default Timer;