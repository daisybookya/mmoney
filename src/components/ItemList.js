import React from 'react';
import {typeBasic,typeIconColor} from '../definition/TypeDefinition'
import { List, Avatar } from 'antd';


const totalPrice = (data) =>{
        if(Object.keys(data).length !== 0){
            let total = data.reduce((ac,cur)=>{
                return ac + Number(cur.price)
            },0)
            return total;
        }
        
        
}
const ItemList = (data:Object) => {
    return (<List
            itemLayout="horizontal"
            dataSource={data.data}
            pagination={{
                pageSize: 10,
            }}
            footer={<div className="txt-total">消費總金額 : NT$ <span>{totalPrice(data.data)}</span></div>}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: typeIconColor[item.type] }}>{typeBasic[item.type]}</Avatar>}
                title={<span><b>{item.buyDate.join('-')}</b> / <span className="txt-tags">{item.tags.length > 0 ? item.tags.join('-'):''}</span></span>}
                description={<span>備註:{item.note}</span>}
                />
                <span className="txt-price">NT$ {item.price}</span>
            </List.Item>
            )}
        />
)}
 
export default ItemList;
 
