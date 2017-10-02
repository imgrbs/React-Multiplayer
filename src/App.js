import React, { Component } from 'react';
import styled from 'styled-components'

import './App.css';

import io from 'socket.io-client'
const socket = io('http://10.5.14.139:3001')


const Player1 = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 50%;
`

const Player2 = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-radius: 50%;
`


class App extends Component {
  
  state = {
    user : '',
    name : 'unknown',
    name1 : '',
    name2 : '',
    role : 'p1',
    left1 : 10,
    top1: 0,
    left2 : 100,
    top2: 0,
    speed: 10
  }

  componentWillMount() {
    let un = window.prompt("Player Name","")
    this.setState({
      user : un
    })
    if(!un==='tae') this.setState({name2:'other', role: 'p2'})
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      // console.log(e);
      switch (e.keyCode) {
        case 39:
          this.handleRight()
          break;
        case 37:
          this.handleLeft()
          break;
        case 38:
          this.handleTop()
          break;
        case 40:
          this.handleDown()
          break;
          default:
          this.handleDown()
          break;
      }
    })
    socket.emit('room')
    socket.on('play', async (data) => {
      let left = +data.player.left
      let top = +data.player.top
      // await this.setState({name:data.player.name})
      if(data.player.name==='tae') {
        await this.setState({
          left1: left,
          top1: top
        })
      } else {
        await this.setState({
          left2: left,
          top2: top
        })
      }
    })
  }

  handleRight = async () => {
    let {name, left1, left2, top1 ,top2} = await this.state

    if(name==='tae') {
      await this.setState({left1 : left1 + this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top1, left: this.state.left1})
    }
    else{
      await this.setState({left2 : left2 + this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top2, left: this.state.left2})
    }
  }
  
  handleLeft = async () => {
    let {name, left1, left2, top1 ,top2} = await this.state
    
    if(name==='tae') {
      await this.setState({left1 : left1 - this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top1, left: this.state.left1})
    }
    else{
      await this.setState({left2 : left2 - this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top2, left: this.state.left2})
    }
  }
  
  handleTop = async () => {
    let {name, left1, left2, top1 ,top2} = await this.state
    
    if(name==='tae') {
      await this.setState({top1 : top1 - this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top1, left: this.state.left1})
    }
    else{
      await this.setState({top2 : top2 - this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top2, left: this.state.left2})
    }
    
  }
  
  handleDown = async () => {
    let {name, left1, left2, top1 ,top2} = await this.state
    
    if(name==='tae'){
      await this.setState({top1 : top1 + this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top1, left: this.state.left1})
    }
    else {
      await this.setState({top2 : top2 + this.state.speed})
      socket.emit('move', {name: this.state.name, top: this.state.top2, left: this.state.left2})
    }

  }

  render() {
    return (
      <div className="App">
        <h1>Player : {this.state.name}</h1>
        <br/>
        {/* <button onClick={()=>this.handleRight()}>></button> */}
        <button onClick={()=>this.setState({name:'tae'})}>change character1</button>
        <button onClick={()=>this.setState({name:'other'})}>change character2</button>
        <div className="App-intro">
          <Player1 name={this.state.name} left={this.state.left1} top={this.state.top1}>{
            this.state.role === 'p1' ? this.state.name1:this.state.name2  
          }</Player1>
          <Player2 name={this.state.name} left={this.state.left2} top={this.state.top2}>{
            this.state.role === 'p2' ? this.state.name2:this.state.name1
          }</Player2>          
        </div>
      </div>
    );
  }
}

export default App;
