import React from "react";
import config from '../config/index.json';
import Divider from './Divider';

const Team = () => {

  const { team } = config;

  const title = "Meet the Team"

  return (
    <div id="team" className={`text-center`}>
      <div className={`flex-col`}>
        <div className={`container max-w-5xl mx-auto m-8`}>
          <h2 className={`w-full my-2 text-5xl font-bold leading-tight text-center`}>
          {title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 3 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
          </h2>
          <Divider />
        </div>
        <div id="row" className={`flex flex-wrap justify-center`}>
          {team.founders
            ? team.founders.map((d, i) => (
                <div key={`${d.name}-${i}`} className={`my-2 p-4 outline-black w-md`}>
                  <div className="thumbnail">
                    {" "}
                    <img src={d.img} alt="..." className={`w-64`} />
                    <div className="caption">
                      <div className={`flex flex-row justify-center content-center items-center`}>
                        <h4 className={`text-3xl font-semibold mr-4`}>
                            {d.name}
                        </h4>
                        <a
                            aria-label="linkedin"
                            href={d.social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                            className="fill-current text-gray-800 dark:text-white hover:text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                      </div>
                      <p className={`text-primary font-semibold`}>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
        <div id="row" className={`flex flex-wrap justify-center`}>
          {team.advisors
            ? team.advisors.map((d, i) => (
                <div key={`${d.name}-${i}`} className={`my-2 p-4 outline-black w-md`}>
                  <div className="thumbnail">
                    {" "}
                    <img src={d.img} alt="..." className={`w-48`} />
                    <div className="caption">
                      <div className={`flex flex-row justify-center content-center items-center`}>
                        <h4 className={`text-xl font-semibold mr-3`}>
                            {d.name}
                        </h4>
                        <a
                            aria-label="linkedin"
                            href={d.social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                            className="fill-current text-gray-800 dark:text-white hover:text-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                      </div>
                      <p className={`text-secondary font-semibold`}>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

export default Team;