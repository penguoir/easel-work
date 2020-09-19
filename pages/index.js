import moment from 'moment'
import fetch from 'isomorphic-unfetch'
import useAssignments from '../lib/useAssignment'

function Index() {
  const courses = useAssignments()
  const full_courses = courses.filter(x => x.assignmentsConnection.edges.length > 0)

  return (
    <>
      <div className="container my-5">
        {full_courses.map(x => 
          <div className="mb-4">
            <h2 className="h6 font-weight-bold">{x.name}</h2>
            <div className="list-group">
              {x.assignmentsConnection.edges.map(ass =>
                <div key={ass.id} className="list-group-item">
                  <div>{ass.node.name}</div>
                  <div className="font-italic">{moment(ass.node.dueAt).fromNow()}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Index
