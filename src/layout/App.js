import React, { Component } from 'react';
import { Divider,Row, Col ,Slider } from 'antd';
import ItemInput from '../components/ItemInput'
import ItemContent from '../components/ItemContent'
import ItemList from '../components/ItemList'
import '../css/App.css';

let allData=[];
let month = Number(new Date().getMonth())+1;
let marks = createMonth();
let onSearchItem={ //儲存搜尋結果
  month:{},
  displayType:{},
  now:{},
  category:'',
  tags:[],

};
//創造12月份標記
function createMonth(){
  let totalMonth={};
  for(var i=1;i<13;i++){
    totalMonth[i] = `${i}月`;
  }
  return totalMonth;
}
class App extends Component {
  state = {
    data:{},
    nowMonth:month,
  }
  sendNewItem = (data)=>{
   let newItem = [data,...allData]
   let newLists = this.sortByDate(newItem)
  
   allData = newItem;
   this.updateDisplayMonth(newLists);
   this.setState({data:newLists})
  }
  
  componentDidMount() {
    this.handleServerItemsLoad()

 }
 //依照當月日期排序
 sortByDate = (data,order) =>{
  const monthNow =  order || data[0].buyDate[1];
  let newSort = data.filter((item)=>{
    return item.buyDate[1] === Number(monthNow)
  });
  newSort = newSort.sort((a,b)=>{
      return  b.buyDate[2] - a.buyDate[2]
  })
  this.setState({nowMonth:monthNow});
  return newSort
 }
 handleServerItemsLoad = () => {
   //http://localhost:5555/lists
    fetch('../dataList.json', {
      method: 'GET'
      })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((itemList) => {
        console.log(itemList)
         const items = itemList.lists.map((item) => {
           return Object.assign({}, item)
         })

        //載入資料，重新渲染
        allData = [...items];
        const defaultList = this.sortByDate(allData,month)
        this.updateDisplayMonth(defaultList);
        this.setState({
            data:defaultList
        })
      })
    }
    //處理選中月份
    handleNowMonth = (value)=>{
      let displayNewMonth = this.sortByDate(allData,value)
      this.updateDisplayMonth(displayNewMonth);
      //console.log(`app js onSearchItem`,onSearchItem)
      this.setState({nowMonth:value,data:displayNewMonth})
    }
    //更新顯示搜尋結果
    updateDisplayMonth = (data)=>{
      onSearchItem['month'] = [...data]
      onSearchItem['displayType'] = [...data]
    }
    //處理選中類別
     handlePickedType = (value:String,type:String)=>{
      let newSort:Object;
      if(value === 'none'){ //如果取消選取
        onSearchItem[type] = '';
        newSort = onSearchItem['month'];//則顯示當月紀錄
      }else{
        onSearchItem[type] = value; //紀錄此次類別
        newSort = this.sortByCategory(value); //搜尋類別
      }
      onSearchItem.displayType = newSort;//儲存類別搜尋紀錄
      
      if(onSearchItem['tags'].length > 0){ //如果仍有搜尋標籤
        let selectedType = onSearchItem['displayType'];
        newSort = this.sortByTags(selectedType,onSearchItem['tags']); //從類別紀錄去搜尋標籤
      }
      this.setState({data:newSort})
     }

     //處理選中標籤
     handlePickedTags = (value:Array,type:String)=>{
      onSearchItem[type] = value; //紀錄此次標籤
      
      let hasDisplayType = onSearchItem['displayType'];
      if(value.length === 0){ //如果標籤全取消
        this.setState({data:hasDisplayType})  //則顯示類別搜尋紀錄
        return false;
      }
      let newSort = this.sortByTags(hasDisplayType,value)
      this.setState({data:newSort})

     }
     //過濾類別
     sortByCategory = (label:String)=>{
       let newSort = onSearchItem['month'].filter((item)=>{
          return item.type === label;
       })
       return newSort;
     }
     //過濾標籤
     sortByTags = (data:Object,label:Array)=>{
      let newArray = [{}];
       label.forEach((tag)=>{
        let tempary = data.filter((item)=> item.tags.includes(tag))
        newArray = newArray.concat(tempary);

        })
        newArray.splice(0,1); //移除第一個空物件[{}]
        newArray.sort((a,b)=>{ //將搜尋結果依日期重新排列
          return  b.buyDate[2] - a.buyDate[2]
        })
       return newArray;
    }

  render() {
    return (
      <div className="App">
        <Row>
            <Col span={8} className="float-input"><ItemInput addNewItem={this.sendNewItem}></ItemInput></Col>
            <Col span={16} offset={8}>
                  <div className="list-content">
                        <Divider style={{ color: '#999' }} orientation="left">帳目類別</Divider>
                        <Slider style={{width:'80%',margin:'0 auto 40px'}} marks={marks} defaultValue={this.state.nowMonth} value={this.state.nowMonth} min={1} max={12} onChange={this.handleNowMonth} />
                        <ItemContent list={this.state.data} pickCategory={this.handlePickedType} pickTags={this.handlePickedTags}></ItemContent>
                        <Divider style={{ color: '#999' }} orientation="right">帳目列表</Divider>
                        <div className="list-detail">
                            <h2>2018 / <span className="display-month">{this.state.nowMonth}</span>月</h2>
                            <ItemList data={this.state.data} ></ItemList>
                        </div>
                  </div>
            </Col>
        </Row>
      </div>
    );
  }
}

export default App;
