import React, { Component } from 'react';
//import ItemList from './ItemList'
import BtnCategory from './BtnCategory'
import TagCategory from './TagCategory'
import {typeBasic} from '../definition/TypeDefinition'
import { Switch } from 'antd';

class ItemContent extends Component {
    state = { 
        disabled:false,
    }
    handleCategory = (item,type)=>{
        this.props.pickCategory(item.target.value,type)        
    }
    handleTagsSort = (item,type)=>{
        this.props.pickTags(item,type)
    }
    handleDisabledType = (disabled)=>{
        this.setState({disabled})
    }

    render() { 
        const{disabled} = this.state;
        return ( 
                <div className="list-category">

                    <span>更多分類搜尋: <Switch size="small" defaultChecked={disabled} onChange={this.handleDisabledType} /></span>
                    <div className={(disabled === false) ? 'category':'category active'}>
                            <span>基本類別:</span>
                            <BtnCategory default={false} dataObj={typeBasic} newItem={{"none":"取消選取"}} setCategory={(value)=>this.handleCategory(value,'category')} ></BtnCategory>
                            <span>標籤類別:</span>
                            <TagCategory mode="multiple" placeholderTxt="請選擇標籤分類" setTags={(value)=>this.handleTagsSort(value,'tags')}></TagCategory>
                            <br />
                            {/* <span>依價格排序:</span>
                            <BtnCategory default={false} dataObj={btnSortLowHigh} newItem={{}} setCategory={(value)=>this.handleCategory(value,3)} ></BtnCategory> */}
                    </div>
                </div>
                

         )
    }
}
 
export default ItemContent;
