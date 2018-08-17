import React from 'react';
import BtnCategory from './BtnCategory'
import TagCategory from './TagCategory'
import {typeBasic} from '../definition/TypeDefinition'

let buyType:string = 'food';
let tags:Array = [];
const ItemType = (props:{setBuyType:Function,tagsValue:Object}) => {
    const handleType = (e:Event)=>{
        //console.log(e)
        buyType = e.target.value;
        props.setBuyType({type:e.target.value,tags:tags});
     }
    const handleTags = (data:Array)=>{
        props.setBuyType({type:buyType,tags:data});
     }

    return ( 
        <div>
                <div className="input-types">
                    <BtnCategory dataObj={typeBasic} default={true} newItem={{}} setCategory={handleType} ></BtnCategory>
                </div>
                <div className="input-types">
                    <TagCategory mode="tags" isClear={props.tagsValue} placeholderTxt="請填寫標籤" setTags={handleTags}></TagCategory>
                    <p>( 如要新增標籤，請在標籤之間以逗號分隔，例: 夏季旅行,冬季旅行 )</p>
                </div>
            </div>
     );
}
 
export default ItemType;

// class ItemType extends Component {
//     state = {
//         buyType:'food',
//         tags:[],
//     }
//     handleType = (e:Event)=>{
//         this.setState({ buyType:e.target.value });
//         this.props.setBuyType({type:e.target.value,tags:this.state.tags});
//      }
//      handleTags = (data:Array)=>{
//         this.setState({ tags:data }); 
//         this.props.setBuyType({type:this.state.buyType,tags:data});
            
//      }
//     render() { 
//         return ( 
//             <div>
//                 <div className="input-types">
//                     <Radio.Group buttonStyle="solid" size="large" defaultValue="food" onChange={this.handleType}>
//                         <Radio.Button value="food">食</Radio.Button>
//                         <Radio.Button value="clothes">衣</Radio.Button>
//                         <Radio.Button value="live">住</Radio.Button>
//                         <Radio.Button value="transfer">行</Radio.Button>
//                         <Radio.Button value="relax">玩</Radio.Button>
//                     </Radio.Group>
//                 </div>
//                 <div className="input-types">
//                     <Select mode="tags" placeholder="請填寫標籤" style={{ width: '100%' }} notFoundContent="no Tags" onChange={this.handleTags} tokenSeparators={[',']}>{children}</Select>
//                     <p>( 請在標籤之間以逗號分隔，例: 夏季旅行,冬季旅行 )</p>
//                 </div>
//             </div>
//          );
//     }
// }
 
// export default ItemType;