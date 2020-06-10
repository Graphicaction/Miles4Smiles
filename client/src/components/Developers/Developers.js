import React from 'react';

const Developers = () => {
  const developers = [
    {
      name: 'Rachel Humble',
      image: 'https://avatars0.githubusercontent.com/u/58493428?v=4',
      github: 'https://github.com/rachelhumble',
      linkedin: 'https://www.linkedin.com/in/rachelhumble/',
    },
    {
      name: 'Stephanie Lebby',
      image: 'https://avatars0.githubusercontent.com/u/56233744?v=4',
      github: 'https://github.com/Steffield',
      linkedin: 'https://www.linkedin.com/in/stephanie-lebby/',
    },
    {
      name: 'Rashmi Sharma',
      image: 'https://avatars0.githubusercontent.com/u/28842469?v=4',
      github: 'https://github.com/Graphicaction',
      linkedin: 'https://www.linkedin.com/in/rashmi-sharma9/',
    },
  ];

  return (
    <>
      {developers.map((dev, i) => (
        <div key={i} className="col-lg-3 col-md-4 col-sm-6">
          <div className="card dev">
            <div className="card imgCard">
              <img className="card-img-top" alt={dev.name} src={dev.image} />
              <h5 className="text-center devName">{dev.name}</h5>
              <div className="card-img-overlay">
                <a className="float-left btn-circle" href={dev.github}>
                  <i className="fa fa-github" />
                </a>
                <a className="float-right btn-circle" href={dev.linkedin}>
                  <i className="fa fa-linkedin" />
                </a>
              </div>
            </div>
            {/* <p className="text-center devImg">
              <a className="float-left" href={dev.github}>
                <i className="fa fa-github" />
              </a>
              <img
                className="img-thumbnail"
                alt={dev.name}
                src={dev.image}
                width="100px"
                height="100px"
              />
              <a className="float-right" href={dev.linkedin}>
                <i className="fa fa-linkedin" />
              </a>
            </p> */}
            {/* <hr></hr>
            <div className=" linkBody">
              <p className="links">
                <a className="float-left" href={dev.github}>
                  <i className="fa fa-github" />
                </a>
                <a className="float-right" href={dev.linkedin}>
                  <i className="fa fa-linkedin" />
                </a>
              </p>
            </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default Developers;
