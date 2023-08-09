import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="p-8  h-screen w-full bg-light justify-center">
      <h1 className="text-2xl text-dark font-bold  text-center ">
        Welcome to in-
        <span className="font-satisfy font-bold text-center">Quiz</span>
        -itive! Are you ready to test your knowledge?
      </h1>

      <Link to={`/home`}>
        <div className="bg-light w-full p-8 flex justify-center font-sans">
          <button
            className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
          >
            Begin
          </button>
        </div>
      </Link>
    </section>
  );
};

export default Welcome;
