import checklist_image from "../images/cheklist-image.png";
import Button from "./Button";

function MinorSide(props) {
  const text1 = props.text1;
  const text2 = props.text2;
  const text3 = props.text3;
  const buttonLabel = props.buttonLabel;
  const onClick = props.onClick;
  return (
    <>
      <div className="hidden sm:flex justify-center items-center bg-gradient-to-b from-emerald-700 to-green-500 w-4/12 h-full relative">
        {/* Background image */}
        <img
          src={checklist_image}
          alt=""
          className="absolute w-4/6 mix-blend-overlay opacity-10"
        />

        {/* Center part */}
        <div className="flex flex-col w-2/3 p-3">
          <h2 className="text-[30px] font-bold text-zinc-50">{text1}</h2>
          <h3 className="opacity-70 text-white">{text2}</h3>

          <h3 className="opacity-70 text-white mt-6">{text3}</h3>

          <Button
            ButtonType="submit"
            buttonClassName="z-10 text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm min-w-[6rem] max-w-[8rem] w-1/2 px-5 py-2.5 text-center mt-10"
            buttonLabel={buttonLabel}
            onClick={onClick}
          ></Button>
        </div>
      </div>
    </>
  );
}

export default MinorSide;
