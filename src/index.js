import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//React 컴포넌트 3가지
//1.square : <button>을 렌더링하고  ,Board : 사각형 9개를 렌더링 , Game :게임판을 렌더링하며 나중에 수정할 자리 표시자 값을 가지고 있다.

//props 을 통해 데이터 전달하기

//Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달해봅시다.

//Square 자식 컴포넌트
class Square extends React.Component {
    constructor(props) {
        super(props); //js 클래스에서 하위클래스의 생성자를 정의 할때 항상 super 를 호출해야한다.//리액트 컴포넌트 클래스는 생성자를 가질때 super(props) 호출 구문 부터 작성해야한다.
        this.state = { //class 에 생성자를 추가하여 state 를 초기화합니다.
            value : null,
        };
    }
    render() {
        return (
            // <button className="square" onClick={function() { alert('click')}}> </button> 아래부터는 (17줄) 화살표함수 사용
            <button className="square" 
            onClick={() =>  this.setState({value : 'X'})}
            > 
             {this.state.value}
            </button>
            //square 를 클릭할대 현재 state 값을 표시하기 위해서 render 함수를 변경할것임
        );
    }
}

//Board 부모 컴포넌트
class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            square : Array(9).fill(null),
        };
    }
    renderSquare(i) {
      //  return <Square value={i}/>; 코드 수정 합니다!!!~
      return( 
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}//여기 부터 다시 시작~!~~ 
                // *주의 :반환되는 엘리먼트를 여러 줄로 나누어 가독성을 확보하였고 괄호를 추가하여 JavaScript가 return 뒤에 세미콜론을 삽입하지 않아도 코드가 깨지지 않습니다
            />
        );
    }
    render() {
        const status = '틱앤톡';
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
      }
    }

//Game    
class Game extends React.Component {
    render() {
    return (
        <div className="game">
        <div className="game-board">
            <Board />
        </div>
        <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
        </div>
        </div>
    );
    }
}
    
    // ========================================
    
    ReactDOM.render(
      <Game />,
      document.getElementById('root')
    );
    