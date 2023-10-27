function Form(props) {
  const formLabel = props.formLabel;

  return (
    <>
      {/* White Box */}
      <div className="z-10 flex flex-col w-[95%] sm:w-[85%] md:w-[65%] bg-white border-2 border-black border-opacity-30 rounded-2xl shadow-2xl shadow-stone-500 p-3">
        <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold text-center">
          {formLabel}
        </h1>

        <form>{props.children}</form>
      </div>
    </>
  );
}

export default Form;
