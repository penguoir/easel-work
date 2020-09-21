function courseToCode(course) {
  switch (course.id) {
    case 'Q291cnNlLTE4MjI=':
      return 'Pany\'s further maths'
    case 'Q291cnNlLTE4MjA=':
      return 'Jeff\'s further maths'
    case 'Q291cnNlLTE4NDE=':
      return 'applied maths'
    default:
      course.name
  }

  return course.name
}

function Course({ course }) {
  return (
    <span className="font-italic">{courseToCode(course)}</span>
  )
}

export default Course
