import { Link, useParams } from "react-router-dom";

export const SeeResult: React.FC = () => {
  const { roundId } = useParams<{
    roundId: string;
  }>();

  return (
    <section className="w-full h-screen bg-light">
      <div className="text-2xl p-8 text-dark font-bold text-center">
        Well done you have finished the quiz!
      </div>
      <div className="w-full p-8 flex justify-center font-sans">
      <Link to={`/results/${roundId}`}>
          <button
            className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
          >
            Click here to see your result!
          </button>
      </Link>
      </div>
    </section>
  );
};
