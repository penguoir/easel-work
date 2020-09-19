import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

function useAssignments () {
  const [assignments, setAssignments] = useState([])
  const auth_token = '3088~4ou006VO3Et0oN4bgkeg7TcnIQcdwwntxgWXtI3d66pH1IZOUPPUs7OsrZH8l1My'

  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
  const query = `
    query AllAssignments {
        allCourses {
          name
          assignmentsConnection {
            edges {
              node {
                id
                name
                dueAt
              }
            }
          }
        }
      }
  `
  const endpoint = corsAnywhere + 'https://kingalfred.instructure.com/api/graphql?query=' + query

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${auth_token}`
    },
  }

  useEffect(() => {
    fetch(endpoint, options)
      .then(r => r.json())
      .then(data => {
        setAssignments(data.data.allCourses)
      })
      .catch(err => console.error(err))
  }, [])

  return assignments
}

export default useAssignments

