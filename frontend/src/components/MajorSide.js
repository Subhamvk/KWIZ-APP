import gears_image from "../images/gears.png";
import hexagon_spread from "../images/hexagon_spread.png";

function MajorSide(props) {
  return (
    <>
      <div className="relative flex justify-center items-center w-full sm:w-8/12 h-full bg-gradient-to-b from-blue-200 via-fuchsia-200 to-sky-200">
        <img
          src={gears_image}
          alt=""
          className="bottom-0 right-0 absolute w-4/12 mix-blend-overlay"
        />

        <img
          src={hexagon_spread}
          alt=""
          className="top-0 left-0 absolute w-10/12 mix-blend-overlay opacity-50"
        />

        {props.children}
      </div>
    </>
  );
}

export default MajorSide;
