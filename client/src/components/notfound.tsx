const NotFound = () => {
  return (
    <section className="w-full bg-light">
      <div className="text-dark font-bold justify-center">
        Whoops. Let's get you back home
      </div>
      <div className="bg-light w-full p-8 flex justify-center font-sans">
        <a href="/home">
          <button className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-4 rounded-l;">
            Take me home
          </button>
        </a>
      </div>
    </section>
  );
};

export default NotFound;
