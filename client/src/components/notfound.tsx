const NotFound = () => {
  return (
    <section className="w-full bg-light">
      <div className="text-dark font-bold justify-center">
        Whoops. Let's get you back home
      </div>
      <div className="bg-light w-full p-8 flex justify-center font-sans">
        <a href="/home">
          <button
            className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
          >
            Take me home
          </button>
        </a>
      </div>
    </section>
  );
};

export default NotFound;
