import React, { Component } from 'react';
import { Slider, Switch } from 'antd';


let totalDay;
let defaultToday;
function formatter(value) {
    return `${value} 日`;
  }
function formatterM(value) {
    return `${value} 月`;
}

class ItemType extends Component {
    state = { 
        buyDate:[],
        disabled: false,
     }
     //react v16.4 new lifecycle
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isClear){
            return{
                buyDate:defaultToday
            }
        }
        return  null
    }
    componentDidMount() { //渲染後調用
        let {defaultDay} = this.props
        defaultToday = [...defaultDay];
        this.setState({ buyDate : defaultToday });
    }

    handleDisabledChange = (disabled) => {
        this.setState({ disabled });
    }
    handleDateMonth = (value:number)=> {
        const pickedDay = [...this.state.buyDate]
        pickedDay[1] = value;
        totalDay = new Date(pickedDay[0],value,0).getDate();
        this.setState({ buyDate : pickedDay });
        this.props.setBuyDate(pickedDay);
    }
    handleDateDay = (value:number)=> {
        const pickedDay = [...this.state.buyDate]
        pickedDay[2] = value;
        this.setState({ buyDate : pickedDay });
        this.props.setBuyDate(pickedDay);
    }

    render() {         
        const {disabled,buyDate} = this.state
        let {defaultDay} = this.props
        totalDay = new Date(defaultDay[0],defaultDay[1],0).getDate();
        return ( 
            <div className="input-date">
                 <p>日期: <span className="txt-date"> {this.state.buyDate.join('-')}</span> <span>修改<Switch size="small" checked={disabled} onChange={this.handleDisabledChange} /></span></p> 
                <div className={(disabled === false) ? 'change-date':'change-date active'}>
                    <Slider defaultValue={defaultDay[1]} value={buyDate[1]} min={1} max={12} disabled={!disabled} tipFormatter={formatterM} onChange={this.handleDateMonth} />
                    <Slider defaultValue={defaultDay[2]} value={buyDate[2]} min={1} max={totalDay} tipFormatter={formatter} disabled={!disabled} onChange={this.handleDateDay} />
                </div>
            </div>
         )
    }
}
 
export default ItemType;