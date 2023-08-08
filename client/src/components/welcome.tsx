import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="w-full bg-light">
      <h1 className="text-dark font-bold justify-center">
        {" "}
        Welcome to In-Quiz-itive! Are you ready to test your knowledge?
      </h1>

      <Link to={`/home`}>
        <div className="bg-light w-full p-8 flex justify-center font-sans">
          <button className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-4 rounded-l">
            Begin
          </button>
        </div>
      </Link>
    </section>
  );
};

export default Welcome;
