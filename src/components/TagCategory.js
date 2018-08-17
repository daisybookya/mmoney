import React, { Component } from 'react';
import { Select } from 'antd';
import {tagBasic} from '../definition/TypeDefinition'


const Option = Select.Option;
const children = [];
tagBasic['daily'].map((tag,index)=> children.push(<Option key={tag}>{tag}</Option>))
class TagCategory extends Component {
    state = { 
        tagValue:[],
     }
     static getDerivedStateFromProps(nextProps, prevState) {
        //console.log(`nextProps//`,nextProps)
        if(nextProps.isClear){
            return{
                tagValue:[]
            }
        }
        return  null
    }
    handleTags = (e)=>{
        this.props.setTags(e);
        this.setState({tagValue:e})
        //console.log(e)
    }
    render() { 
        let {mode,placeholderTxt} = this.props
        return ( 
            mode === 'tags' ? <Select 
                                mode="tags" placeholder={placeholderTxt} style={{ width: '100%' }} 
                                notFoundContent="no Tags" value={this.state.tagValue} onChange={this.handleTags} 
                                tokenSeparators={[',']}>{children}</Select>
                                :<Select
                                mode="multiple"
                                style={{ width: '30%' }}
                                placeholder={placeholderTxt}
                                onChange={this.handleTags} allowClear={true}>
                                {children}</Select>
         );
    }
}
 
export default TagCategory;
//  const TagCategory = (props:{mode:string,placeholderTxt:string,setTags:Function,value:Array}) => {

//     const Option = Select.Option;
//     const children = [];
//     let basicTags = tagBasic['daily'].map((tag,index)=> children.push(<Option key={tag}>{tag}</Option>))
//     //console.log(basicTags)
//     const handleTags = (e)=>{
//         props.setTags(e);
//     }
    
//      return ( 
//         props.mode === 'tags' ? <Select 
//                                 mode="tags" placeholder={props.placeholderTxt} style={{ width: '100%' }} 
//                                 notFoundContent="no Tags" onChange={handleTags} 
//                                 tokenSeparators={[',']}>{children}</Select>
//                                 :<Select
//                                 mode="multiple"
//                                 style={{ width: '30%' }}
//                                 placeholder={props.placeholderTxt}
//                                 onChange={handleTags} allowClear={true}>
//                                 {children}</Select>
//       );
//  }
  
//  export default TagCategory;
