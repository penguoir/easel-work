import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { db } from '../lib/firebase'

function useAssignments () {
  const [assignments, setAssignments] = useState({})

  const auth_token = '3088~4ou006VO3Et0oN4bgkeg7TcnIQcdwwntxgWXtI3d66pH1IZOUPPUs7OsrZH8l1My'
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth_token}`
    },
  }
  const query = `
    query AllAssignments {
        allCourses {
          id
          name

          assignmentsConnection {
            nodes {
              id
              name
              dueAt
              htmlUrl
            }
          }
        }
      }
  `
  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
  const endpoint = corsAnywhere + 'https://kingalfred.instructure.com/api/graphql?query=' + query

  useEffect(() => {
    fetch(endpoint, options)
      .then(r => r.json())
      .then(data => {
        const courses = data.data.allCourses
        const newAssignments = {}

        courses.forEach(course => {
          course.assignmentsConnection.nodes.forEach(assignment => {
            newAssignments[assignment.id] = { ...assignment, course }
          })
        })

        setAssignments(newAssignments)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    let unsubscribe = () => {}

    if (Object.keys(assignments).length !== 0) {
       unsubscribe = db.collection('assignments').onSnapshot(snapshot => {
        setAssignments(assignments => {
          const newAssignments = {...assignments}

          snapshot.docs.forEach(x => {
            const data = x.data()

            if (assignments[x.id]) {
              newAssignments[x.id]['done'] = data.done
              newAssignments[x.id]['deleted'] = data.deleted
            }
          })

          return newAssignments
        })
      })
    }

    return unsubscribe
  }, [assignments])

  return assignments
}

export default useAssignments

