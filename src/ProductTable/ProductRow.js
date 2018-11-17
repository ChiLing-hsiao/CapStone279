import React,{Component} from 'react';//引入react

//创建列表组件
export default class ProductRow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}