import './style.css'

function Skeleton(){

  return(
    <>
    <div className="movies__conteiner">
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
      <div className="movie loading"></div>
    </div>
    <div className="controlsBox">
     <div className="controlsBox_button loading"></div>
     <div className="controlsBox_button loading"></div>
    </div>
  </>
  )
}

export default Skeleton;