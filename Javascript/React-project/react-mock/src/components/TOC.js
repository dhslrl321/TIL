import React, {Component} from 'react'

class TOC extends Component {
    
    render() {

        let data = this.props.data;
        let list = []
        // for(let i = 0; i < data.length; i++){
        //     list.push(<li key={data[i].id}><a href={"/content/"+data[i].id}>{data[i].title}</a></li>)
        // }

        for(let i = 0; i < data.length; i++){
            list.push(
                <li key={data[i].id}><a href={data[i].id} 
                onClick={function(e){
                    alert(data[i].title);
                    e.preventDefault();
                    this.setState({
                        mode: data[i].title
                    });
                }.bind(this)}>{data[i].title}</a></li>
            )
        }

        return(
            <nav>
            <ul>
                {list}
            </ul>
            </nav>
        );
    }
  }

  export default TOC;