import React, { Component } from 'react';
import './index.css';

class pictureSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllSelected: false,
      pictures: this.props.pictures,
      selectedMap: {}
    }
  }

  componentDidMount() {
    let selectedMap = {};
    let pictures = [];
    this.props.pictures.forEach((pic) => {
      selectedMap[pic.id] = false;
      pictures.push(pic)
    });
    this.props.value.forEach(id => {
      selectedMap[id] = true;
    })
    this.setState({
      selectedMap: selectedMap,
      pictures: pictures
    });
  }

  render() {
    return (
        <div className="pic-list">
          <input type="checkbox" name="checkAll" checked={this.state.isAllSelected} onChange={this.handleSelectAll} />
          已选中{this.props.value.length}个文件<br/>
          {
            this.state.pictures.map((pic) => {
              return (
                <div className="select-item" key={pic.id}>
                  <input className="ipt-item" type="checkbox" name={'pic' + pic.id} checked={this.state.selectedMap[pic.id] || ''} onChange={this.handleSelect.bind(null, pic)} />
                  <img className="pic-item" src={pic.url} alt=""/>
                </div>
              );
            })
          }
        </div>
    )
  }

  handleSelect = (pic) => {
   if (this.state.selectedMap[pic.id]) {
        pic.selected = false;
        this.updateSelectedMap([{
          id: pic.id,
          selected: false
        }]);
      } else {
        pic.selected = true;
        this.updateSelectedMap([{
          id: pic.id,
          selected: true
        }]);
      }
   }

   handleSelectAll = () => {
     let pictures = [...this.state.pictures];
     let operatePics = [];
     if (this.state.isAllSelected) {
      pictures.forEach((pic) => {
        pic.selected = false;
        operatePics.push({
          id: pic.id,
          selected: false
        })
      })
      this.setState({
        isAllSelected: false,
        pictures: pictures
      }, this.updateSelectedMap(operatePics))
     } else {
      pictures.forEach((pic) => {
        pic.selected = true;
        operatePics.push({
          id: pic.id,
          selected: true
        })
      })
      this.setState({
        isAllSelected: true,
        pictures: pictures
      }, this.updateSelectedMap(operatePics))
     }
   }

   updateSelectedMap = operatePics => {
    let selectedMap = {...this.state.selectedMap};
    operatePics.forEach(operatePic => {
      selectedMap[operatePic.id] = operatePic.selected;
    })
    this.setState({
      selectedMap: selectedMap
    }, this.updataIsAllSelected)
   }

   updateSelectedPics = () => {
    let value = [];
    this.state.pictures.forEach(pic => {
      if (this.state.selectedMap[pic.id]) {
        value.push(pic.id);
      }
    })
    this.props.onChange(value);
   }

   updataIsAllSelected() {
     let isAllSelected = true;
     for (let key in this.state.selectedMap) {
       if (!this.state.selectedMap[key]) {
         isAllSelected = false;
       }
     }
     this.setState({
        isAllSelected: isAllSelected
     }, this.updateSelectedPics)
   }
}

export default pictureSelect;