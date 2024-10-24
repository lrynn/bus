import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Unity, useUnityContext } from "react-unity-webgl";
import { Link } from 'react-router-dom';

import './main.css';
import './article/article.css'
import { useUserInfo } from '../App';
import ImageSlider from './ImageSlider';

export const gameList = [
  'khuonbird',
  'tetris',
  'msweeper',
  'snake',
  'pacman',
  'popcat',
  'numbsball',
  'majorattack'
];
export const gameListKR = [
  '플래피쿠옹',
  '테트리스',
  '지뢰 찾기',
  '스네이크',
  '팩맨',
  '쿠옹이 팝캣',
  '숫자야구',
  '전공어택'
];

export default function Main() {
  return (
    <div className='divContents'>
      <Routes>
        <Route path='/' element={<ImageSlider />}/>
        <Route path='/game/*' element={<Game />} />
      </Routes>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className='allGamesList'>
      <table>
        <tr>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[0]}`}>
              <img src='/img/khuonbird.png' Link='/game/khuonbird' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[0]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[1]}`}>
              <img src='/img/tetris.png' Link='/game/tetris' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[1]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[2]}`}>
              <img src='/img/minesweeper.png' Link='/game/msweeper' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[2]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[3]}`}>
              <img src='/img/sneak.png' Link='/game/snake' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[3]}
              </h1>
            </Link>
          </td>
        </tr>
        <tr>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[4]}`}>
              <img src='/img/pacman.png' Link='/game/pacman' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[4]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[5]}`}>
              <img src='/img/popkhu.png' Link='/game/popcat' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[5]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[6]}`}>
              <img src='/img/numbsball.png' Link='/game/numbsball' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[6]}
              </h1>
            </Link>
          </td>
          <td className='thumbnail'>
            <Link to={`/game/${gameList[7]}`}>
              <img src='/img/attack.png' Link='/game/majorattack' style={{ width: '100%', height:'100px' }} />
              <h1 className='thumbnailText'>
                {gameListKR[7]}
              </h1>
            </Link>
          </td>
        </tr>
      </table>
    </div>
  );
}

function Game() {
  return (
    <div>
      <Routes>
        <Route path='khuonbird'   element={<Khuonbird />} />
        <Route path='tetris'      element={<Tetris />}    />
        <Route path='msweeper'    element={<Msweeper />}  />
        <Route path='snake'       element={<Snake />}     />
        <Route path='pacman'      element={<Pacman />}    />
        <Route path='popcat'      element={<Popcat />}    />
        <Route path='numbsball'   element={<Numbsball />} />
        <Route path='majorattack' element={<Majorattack />}/>
      </Routes>
    </div>
  );
};

function Khuonbird() {
  const { unityProvider, isLoaded } = useUnityContext({
    dataUrl: "/games/khuonbird/Build/Flappy_Bird.data",
    frameworkUrl: "/games/khuonbird/Build/Flappy_Bird.framework.js",
    loaderUrl: "/games/khuonbird/Build/Flappy_Bird.loader.js",
    codeUrl: "/games/khuonbird/Build/Flappy_Bird.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };

  useEffect(() => {
    const sendDataToUnity = async () => {
      if (isLoaded) {
        try {
          setTimeout(() => {
            console.log("2초지남ㅅㄱ")
          }, 2000);
          console.log("type of unityProvider.send : "+typeof unityProvider.send)
          if (unityProvider && typeof unityProvider.send === 'function') {
            await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
            console.log("Sending data...")
          }
          else console.log("Something is wrong in unityProvider!")
          console.log('Data sent successfully');
        } catch (error) {
          console.error('유니티로 정보 전달 실패:', error);
        }
      } else {
        console.error('Unity is not loaded yet.');
      }
    };
    sendDataToUnity();
  }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가


  return (
    <div>
      <h1>
        {gameListKR[0]}
      </h1>
      <div className="Unity">
          <Unity unityProvider={unityProvider}
              style={{width: '100%'}}
          />
      </div>
      <div className='gamePage'>
        <p>
          조작 : 스페이스바 또는 좌클릭
        </p>
      </div>
    </div>
  );
}

function Tetris() {
  const { unityProvider, isLoaded } = useUnityContext({
    dataUrl: "/games/tetris/Build/TETRIS.data",
    frameworkUrl: "/games/tetris/Build/TETRIS.framework.js",
    loaderUrl: "/games/tetris/Build/TETRIS.loader.js",
    codeUrl: "/games/tetris/Build/TETRIS.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };

useEffect(() => {
  const sendDataToUnity = async () => {
    if (isLoaded) {
      try {
        setTimeout(() => {
          console.log("2초지남ㅅㄱ")
        }, 2000);
        console.log("type of unityProvider.send : "+typeof unityProvider.send)
        if (unityProvider && typeof unityProvider.send === 'function') {
          await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
          console.log("Sending data...")
        }
        else console.log("Something is wrong in unityProvider!")
        console.log('Data sent successfully');
      } catch (error) {
        console.error('유니티로 정보 전달 실패:', error);
      }
    } else {
      console.error('Unity is not loaded yet.');
    }
  };
  sendDataToUnity();
}, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가


  return (
    <div>
      <h1>
        {gameListKR[1]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작법 : 방향키, 스페이스 바
        </p>
      </div>
    </div>
  );
}

function Msweeper() {
  const { unityProvider, isLoaded } = useUnityContext({
    dataUrl: "/games/msweeper/Build/MINESWEEPER.data",
    frameworkUrl: "/games/msweeper/Build/MINESWEEPER.framework.js",
    loaderUrl: "/games/msweeper/Build/MINESWEEPER.loader.js",
    codeUrl: "/games/msweeper/Build/MINESWEEPER.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };

  useEffect(() => {
    const sendDataToUnity = async () => {
      if (isLoaded) {
        try {
          setTimeout(() => {
            console.log("2초지남ㅅㄱ")
          }, 2000);
          console.log("type of unityProvider.send : "+typeof unityProvider.send)
          if (unityProvider && typeof unityProvider.send === 'function') {
            await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
            console.log("Sending data...")
          }
          else console.log("Something is wrong in unityProvider!")
          console.log('Data sent successfully');
        } catch (error) {
          console.error('유니티로 정보 전달 실패:', error);
        }
      } else {
        console.error('Unity is not loaded yet.');
      }
    };
    sendDataToUnity();
  }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가


  return (
    <div>
      <h1>
        {gameListKR[2]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작법 : 좌클릭 (게임 재시작 : 스페이스바)
        </p>
      </div>
    </div>
  );
}

function Snake() {
  const { unityProvider, isLoaded } = useUnityContext({
    dataUrl: "/games/snake/Build/스네이크 웹.data",
    frameworkUrl: "/games/snake/Build/스네이크 웹.framework.js",
    loaderUrl: "/games/snake/Build/스네이크 웹.loader.js",
    codeUrl: "/games/snake/Build/스네이크 웹.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };

  useEffect(() => {
    const sendDataToUnity = async () => {
      if (isLoaded) {
        try {
          setTimeout(() => {
            console.log("2초지남ㅅㄱ")
          }, 2000);
          console.log("type of unityProvider.send : "+typeof unityProvider.send)
          if (unityProvider && typeof unityProvider.send === 'function') {
            await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
            console.log("Sending data...")
          }
          else console.log("Something is wrong in unityProvider!")
          console.log('Data sent successfully');
        } catch (error) {
          console.error('유니티로 정보 전달 실패:', error);
        }
      } else {
        console.error('Unity is not loaded yet.');
      }
    };
    sendDataToUnity();
  }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가


  return(
    <div>
      <h1>
        {gameListKR[3]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작:wasd 또는 방향키
        </p>
      </div>
    </div>
  );
}

function Pacman() {
  const { unityProvider, isLoaded } = useUnityContext({
      loaderUrl: "/games/pacman/Build/Pacman.loader.js",
      dataUrl: "/games/pacman/Build/Pacman.data",
      frameworkUrl: "/games/pacman/Build/Pacman.framework.js",
      codeUrl: "/games/pacman/Build/Pacman.wasm",
    });
    const { userInfo } = useUserInfo();
    const sendData = {
      'userCollege': userInfo[0],
      'userMajor': userInfo[1],
      'userName': userInfo[2]
    };
  
    useEffect(() => {
      const sendDataToUnity = async () => {
        if (isLoaded) {
          try {
            setTimeout(() => {
              console.log("2초지남ㅅㄱ")
            }, 2000);
            console.log("type of unityProvider.send : "+typeof unityProvider.send)
            if (unityProvider && typeof unityProvider.send === 'function') {
              await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
              console.log("Sending data...")
            }
            else console.log("Something is wrong in unityProvider!")
            console.log('Data sent successfully');
          } catch (error) {
            console.error('유니티로 정보 전달 실패:', error);
          }
        } else {
          console.error('Unity is not loaded yet.');
        }
      };
      sendDataToUnity();
    }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가
  

  return(
    <div>
      <h1>
        {gameListKR[4]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작법 : 방향키
        </p>
      </div>
    </div>
  );
}

const Popcat = () => {
  const { unityProvider, isLoaded } = useUnityContext({
    dataUrl: "/games/popcat/Build/Build.data",
    frameworkUrl: "/games/popcat/Build/Build.framework.js",
    loaderUrl: "/games/popcat/Build/Build.loader.js",
    codeUrl: "/games/popcat/Build/Build.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };

  useEffect(() => {
    const sendDataToUnity = async () => {
      if (isLoaded) {
        try {
          setTimeout(() => {
            console.log("2초지남ㅅㄱ")
          }, 2000);
          console.log("type of unityProvider.send : "+typeof unityProvider.send)
          if (unityProvider && typeof unityProvider.send === 'function') {
            await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
            console.log("Sending data...")
          }
          else console.log("Something is wrong in unityProvider!")
          console.log('Data sent successfully');
        } catch (error) {
          console.error('유니티로 정보 전달 실패:', error);
        }
      } else {
        console.error('Unity is not loaded yet.');
      }
    };
    sendDataToUnity();
  }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가

  return(
    <div>
      <h1>
        {gameListKR[5]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작법 : 아무 문자키
        </p>
      </div>
    </div>
  );
}

function Numbsball() {
  const { unityProvider, isLoaded } = useUnityContext({
      loaderUrl: "/games/numbsball/Build/숫자야구 웹.loader.js",
      dataUrl: "/games/numbsball/Build/숫자야구 웹.data",
      frameworkUrl: "/games/numbsball/Build/숫자야구 웹.framework.js",
      codeUrl: "/games/numbsball/Build/숫자야구 웹.wasm",
    });
    const { userInfo } = useUserInfo();
    const sendData = {
      'userCollege': userInfo[0],
      'userMajor': userInfo[1],
      'userName': userInfo[2]
    };
  
    useEffect(() => {
      const sendDataToUnity = async () => {
        if (isLoaded) {
          try {
            setTimeout(() => {
              console.log("2초지남ㅅㄱ")
            }, 2000);
            console.log("type of unityProvider.send : "+typeof unityProvider.send)
            if (unityProvider && typeof unityProvider.send === 'function') {
              await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
              console.log("Sending data...")
            }
            else console.log("Something is wrong in unityProvider!")
            console.log('Data sent successfully');
          } catch (error) {
            console.error('유니티로 정보 전달 실패:', error);
          }
        } else {
          console.error('Unity is not loaded yet.');
        }
      };
      sendDataToUnity();
    }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가
  

  return(
    <div>
      <h1>
        {gameListKR[6]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          입력:엔터 또는 버튼클릭
        </p>
        <p>
          1번 = 20000점<br/>
          2번 = 12000점<br/>
          3번 = 8000점<br/>
          4번 = 4000점<br/>
          5번 = 3000점<br/>
          6번 = 2000점<br/>
          7번 = 1000점<br/>
          8번 = 500점<br/>
          9번 = 250점
        </p>
      </div>
    </div>
  );
}

function Majorattack() {
  const { unityProvider, isLoaded } = useUnityContext({
      loaderUrl: "/games/majorattack/Build/Build.loader.js",
      dataUrl: "/games/majorattack/Build/Build.data",
      frameworkUrl: "/games/majorattack/Build/Build.framework.js",
      codeUrl: "/games/majorattack/Build/Build.wasm",
  });
  const { userInfo } = useUserInfo();
  const sendData = {
    'userCollege': userInfo[0],
    'userMajor': userInfo[1],
    'userName': userInfo[2]
  };


  useEffect(() => {
    const sendDataToUnity = async () => {
      if (isLoaded) {
        try {
          setTimeout(() => {
            console.log("2초지남ㅅㄱ")
          }, 2000);
          console.log("type of unityProvider.send : "+typeof unityProvider.send)
          if (unityProvider && typeof unityProvider.send === 'function') {
            await unityProvider.send('Receiver', "ReceiveData", JSON.stringify(sendData));
            console.log("Sending data...")
          }
          else console.log("Something is wrong in unityProvider!")
          console.log('Data sent successfully');
        } catch (error) {
          console.error('유니티로 정보 전달 실패:', error);
        }
      } else {
        console.error('Unity is not loaded yet.');
      }
    };
    sendDataToUnity();
  }, [isLoaded, unityProvider, sendData]); // 의존성 배열에 필요 요소 추가

  return(
    <div>
      <h1>
        {gameListKR[7]}
      </h1>
      <div className="Unity">
        <Unity unityProvider={unityProvider}
          style={{width: '100%', height: '700px'}}
        />
      </div>
      <div className='gamePage'>
        <p>
          조작법 : 마우스
        </p>
        <p>
          총 5페이즈의 학점몹들이 존재하고 마지막 페이즈가 끝나면 악마교수 보스가 등장
          <br/>
          코인 30개마다 총알 강화
        </p>
      </div>
    </div>
  );
}