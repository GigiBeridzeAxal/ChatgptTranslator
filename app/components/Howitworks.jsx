import React from 'react'

export default function Howitworks() {
  return (
   <div className="howitworks relative">


    <div className="howitworksframe flex flex-col items-center ">
        <h1 className="hoitworkstittle w-[100%] flex items-center justify-center text-[64px] mt-[25px] font-[600]">작동 원리는?</h1>
        <h2 className='text-white text-center flex items-center justify-center mt-[25px] text-[24px] w-[50%]' >앱을 실행한 후, 말할 수 있는 언어를 선택하고, 배우고 싶은 언어도 선택한 다음, 대화를 시작하고 학습할 수 있는 다른 사람들이 있는 패널로 들어갑니다.</h2>
        <br />
        <div className="steps flex items-center justify-evenly w-[80%] gap-[25px]">
          <div className="woman1">
          <div className="lights"></div>
            <div className="womandesc text-white">이 사람은 아나입니다. 그는 3년 동안 독일어를 구사해 왔으며 영어를 배우고 연습하고 싶어합니다.</div>
          </div>
          <div className="woman2">
          <div className="lights2"></div>
          <div className="womandesc text-white">이 사람은 Mziuri입니다. 그는 2년 동안 영어를 구사해 왔고 독일어를 배우고 싶어합니다.</div>
          </div>

          <div className="find mt-[64px] flex items-center justify-around ">
          <img width={300} src="messaging.png" alt="" />

          <div className="text-white howitworkstext text-[36px] flex-col flex gap-[25px] w-[30%]">
          그들은 서로를 찾아 서신을 주고받으며, 우리가 제공하는 도구를 통해 학습 과정이 더욱 쉬워질 것입니다.
            <div className="youcanalso">또한 100개 이상의 언어로 전 세계의 다른 사람들을 만날 수 있습니다.</div>
            <a href='/register'  className= 'startnowbtn p-[10px] text-[16px] text-center bg-blue-500 w-[150px] rounded-[5px]' >지금 시작하세요</a>
          </div>
          </div>

        </div>

        <br />          <br />          <br />
    </div> 
   </div>
  )
}
