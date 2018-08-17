import React from 'react';
import { Radio } from 'antd';

const BtnCategory = (props:{dataObj:Object,newItem:Object,default:boolean,setCategory:Function}) => {

    const typeList = Object.assign({},props.dataObj,props.newItem);
    const items = Object.entries(typeList);
    const btnDefault = items[0][0];
    const handleType = (e)=>{
        props.setCategory(e);
    }
    return ( 
        <Radio.Group buttonStyle="solid" size="large" defaultValue={props.default === true ? btnDefault:''} onChange={handleType}>
            {
                items.map((item,index)=>{
                    return(
                        <Radio.Button key={index*index} value={item[0]}>{item[1]}</Radio.Button>
                    )
                })
            }
        </Radio.Group>
     );
}
 
export default BtnCategory;