export default function Landing(){
  return(
    <>
      <div className="wrapper flex h-full">
        <div  className="wrapper wrapper-left py-15 px-12 max-w-[50%]">
          <div className="wrapper-left--tag text-(--wpg-main-text-color) text-[11px] mb-6 tracking-[3px]">
            AI-POWERED TRAINING
          </div>

          <div className="wrapper-left--title text-[88px] leading-[0.92] mb-7 uppercase">
            <h1>
              build your
              <br/>
              <span className="text-(--wpg-main-text-color)">perfect</span>
              <br/>
              program
            </h1>
          </div>

          <p className="wrapper-left--sub text-[15px] text-(--wpg-muted-text-color) max-w-95 mb-10 leading-[1.7]">
            Answer a few questions. Get a personalized weekly workout plan built for your body, your goals, and your schedule.
          </p>
        </div>

        <div className="wrapper wrapper-right bg-[#1a1a1a]">

        </div>
      </div>
    </>
  )
}