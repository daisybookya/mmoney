import React,{Component} from 'react'
import { Icon,Switch,Input,Button,Divider } from 'antd';
import ItemDate from './ItemDate'
import ItemType from './ItemType'

const { TextArea } = Input;
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const defaultDay = [year,month+1,day]

let allData={
    price:0,
    buyDate:defaultDay,
    type:'food',
    tags:'',
    note:"",
};
class ItemInput extends Component {
    state={
        price:'0',
        loading:false,
        inputOn:false,
        note:'',
        isClear:false
    }
    
    inputNumber =(e)=>{
        const { value } = e.target;
        const newValue = value.replace(/^0|[^0-9]/g, '');
        this.setState({price:newValue})
        allData.price = Number(newValue);
    }
    inputNote =(e)=>{
        this.setState({note: e.target.value})
        allData.note = e.target.value
    }
    getBuyDate = (date:Array) =>{
        allData.buyDate = date
    }
    getBuyType = (data:Object) =>{
        allData = Object.assign({},allData,data)
        //console.log(`input js`,data,allData)
    }
    turnOnInput = (inputOn)=>{
        this.setState({inputOn})
    }

    handleAllData = ()=>{
        let lastType = allData.type;
        this.props.addNewItem(allData);
        this.setState({price:0,note:'',isClear:true,loading:true})
        let self = this;
        allData={
            price:0,
            buyDate:defaultDay,
            type:lastType,
            tags:'',
            note:"",
        };
        setTimeout(function(){
            self.setState({isClear:false,loading:false})
        },800)
    }
    render() { 
        return ( 
                <div className="input-content">
                    <Switch className="btn-input" checkedChildren="開啟" unCheckedChildren="關閉" checked={this.state.inputOn} onChange={this.turnOnInput} />
                    <div className={this.state.inputOn ? 'cover off':'cover'}>
                        <div>
                        <h1>mMoney</h1>
                        <p>[ {<Icon type="edit" style={{ fontSize: 18 }} />} manage my money ]</p>
                        </div>
                        
                    </div>
                    <div className="input-detail">
                        <h1>mMoney</h1>
                        <div className="input-detail">
                            <Divider style={{ color: '#999' }}>新增帳目</Divider>
                            <label htmlFor="price">NT$</label>
                            <Input id="price" size="large" value={this.state.price} onChange={this.inputNumber} />
                            <ItemDate isClear={this.state.isClear} defaultDay={defaultDay} setBuyDate={(date) => this.getBuyDate(date)}></ItemDate>
                            <ItemType tagsValue={this.state.isClear} setBuyType={(date) => this.getBuyType(date)}></ItemType>
                            <TextArea rows={4} value={this.state.note} onChange={this.inputNote} placeholder="備註欄" />
                            <Button type="primary" size='large' loading={this.state.loading} onClick={this.handleAllData}>確定記帳</Button>
                        </div>
                    </div>

                </div>
         );
    }
}

 
export default ItemInput;