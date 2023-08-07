import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="bg-green-200">
      <h1 className="text-3xl text-green-800 font-bold"> Welcome</h1>

      <Link to={`/home`}>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
          Begin
        </button>
      </Link>
    </section>
  );
};

export default Welcome;
