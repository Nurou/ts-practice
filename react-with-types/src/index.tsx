import React from 'react';
import ReactDOM from 'react-dom';

interface ICoursePart {
  name: string;
  exerciseCount: number;
}

interface ICourseParts {
  courseParts: ICoursePart[];
}

type TCourseName = { courseName: string };

const Header = ({ courseName }: TCourseName) => {
  return <h1>{courseName}</h1>;
};

const Content = ({ courseParts }: ICourseParts) => {
  return (
    <>
      {courseParts.map((part: ICoursePart) => (
        <p>{part.name}</p>
      ))}
    </>
  );
};

const Total = ({ courseParts }: ICourseParts) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce(
        (carry: number, part: ICoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};
const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
