import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'console';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseExtended {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseExtended {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}
interface CoursePartCustom extends CoursePartBaseExtended {
  name: 'Custom part';
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartCustom;

interface CourseParts {
  courseParts: CoursePart[];
}

type TCourseName = { courseName: string };

/**
 * Helper function for exhaustive type checking
 */
const exhaustiveCheck = (coursePartProperty: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(
      coursePartProperty
    )}`
  );
};

const Header = ({ courseName }: TCourseName) => {
  return <h1>{courseName}</h1>;
};

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {
  return (
    <>
      {Object.keys(coursePart).map((k, i) => (
        <p>
          {k}: {Object.values(coursePart)[i]}
        </p>
      ))}
    </>
  );
};

const Content = ({ courseParts }: CourseParts) => {
  courseParts.forEach((part) => {
    switch (part.name) {
      case 'Fundamentals':
        break;
      case 'Using props to pass data':
        break;
      case 'Deeper type usage':
        break;
      case 'Custom part':
        break;
      default:
        return exhaustiveCheck(part);
    }
  });

  return (
    <>
      {courseParts.map((part: CoursePart) => (
        <Part coursePart={part} />
      ))}
    </>
  );
};

const Total = ({ courseParts }: CourseParts) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Custom part',
      exerciseCount: 10,
      description: 'Testing...',
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
