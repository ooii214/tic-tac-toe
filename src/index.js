import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//React 컴포넌트 3가지
//1.square : <button>을 렌더링하고  ,Board : 사각형 9개를 렌더링 , Game :게임판을 렌더링하며 나중에 수정할 자리 표시자 값을 가지고 있다.

//props 을 통해 데이터 전달하기

//Board 컴포넌트에서 Square 컴포넌트로 데이터를 전달해봅시다.

//Square 자식 컴포넌트
// react 용어로 squares 컴포넌트는 이제 제어되는 컴포넌트이다. 누가? Board !!
// class Square extends React.Component { //게임 상태를 유지할 필요가 없기 때문에 constructor 지워준다.
//     // constructor(props) {
//     //     super(props); //js 클래스에서 하위클래스의 생성자를 정의 할때 항상 super 를 호출해야한다.//리액트 컴포넌트 클래스는 생성자를 가질때 super(props) 호출 구문 부터 작성해야한다.
//     //     this.state = { //class 에 생성자를 추가하여 state 를 초기화합니다.
//     //         value : null,
//     //     };
//     // }
//     render() {
//         return (
//             // <button className="square" onClick={function() { alert('click')}}> </button> 아래부터는 (17줄) 화살표함수 사용
//             <button className="square" 
//             // onClick={() =>  this.setState({value : 'X'})}
//                onClick={() =>  this.props.onClick()}
//             > 
//              {this.props.value}
//             </button>
//             //square 를 클릭할대 현재 state 값을 표시하기 위해서 render 함수를 변경할것임
//         );
//     }
// }

//함수 컴포넌트
//클래스 컴포넌트에서는 onClick ={() => this.props.onClick()}
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>  
      {props.value}
    </button>
  )
}
//Board 부모 컴포넌트
class Board extends React.Component {//두개의 props전달 1.value 2.onclick
    constructor(props){  //부모 컴포넌트는 props 를 사용하여 자식 컴포넌트에  state 를 다시 전달 할수 있다.
        super(props);
        this.state = {
            squares : Array(9).fill(null), //생성자 추가후 9개의 사각형에 해당하는 9개의 null 배열을 초기 state 로 설정
            xIsNext : true, //(bollean 값) 게임의 state 가 저장될것이다.
        };
    }
    handleClick(i) {
      const squares = this.state.squares.slice();//squares 배열의 사본을 생성!! why? 불변성 때문에
      if(calculateWinner(squares) || squares[i]) {
        return;
      }
      //데이터 변경에는 2가지
      //첫번째는 데이터의 값을 직접변경하는 것
      //두번째는 원하는 변경값을 가진 새로운 사본으로 데이터를 교체
      // squares[i] = 'X';
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares : squares,
        xIsNext : !this.state.xIsNext,
      });
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
   
    render() { // state.xIsNext 값이 있으면 'X' 없으면 'O'
        // const status = '틱택톡게임 다음순서 :   ' + (this.state.xIsNext ? 'X' : 'O');  
        const winner = calculateWinner(this.state.squares);
        console.log("winner:" + winner);
        let status;
        if(winner) {
          status = 'Winner:' + winner;
        } else {
          status ='Next player :' +(this.state.xIsNext ? 'X' : 'O');
        }
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }  
  return null;
}
