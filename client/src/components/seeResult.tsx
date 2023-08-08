import { Link, useParams } from "react-router-dom";


export const SeeResult : React.FC = () => {
  const { roundId } = useParams<{
    roundId: string;
  }>();

  return (
    <Link to={`/result/${roundId}`}>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;">
          Click here to see you result!
        </button>
    </Link>
  )
}