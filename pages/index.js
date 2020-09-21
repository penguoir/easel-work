import fetch from 'isomorphic-unfetch'
import useAssignments from '../lib/useAssignments'
import Assignment from '../lib/Assignment'
import { ArchiveIcon, CheckIcon, FoldDownIcon, FoldUpIcon, ArrowUpIcon, XIcon } from '@primer/octicons-react'
import { db } from '../lib/firebase'
import Head from 'next/head'

function Index() {
  const assignments = useAssignments()
  const [showDeleted, setShowDeleted] = React.useState(false)

  if (!assignments) {
    return 'Loading...'
  }

  const mark = (id, mark) => {
    const ref = db.collection('assignments').doc(id)
    const merge = { merge: true }

    switch (mark) {
      case 'done':
        ref.set({ done: true }, merge)
        break
      case 'not_done':
        ref.set({ done: false }, merge)
        break
      case 'deleted':
        ref.set({ deleted: true }, merge)
        break
      case 'not_deleted':
        ref.set({ deleted: false }, merge)
        break
      default:
        throw Error('Not implemented')
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container my-5">
        {Object.keys(assignments).filter(x => !assignments[x].deleted).length === 0
          && <div className="alert alert-info">No incomplete assignments found</div>}

        <div className="card">
          <div className="card-header">
            Assignments
          </div>
          <div className="list-group list-group-flush">
            {Object.keys(assignments).filter(x => !assignments[x].deleted).map(id => 
              <Assignment key={id} assignment={assignments[id]} mark={mark} />
            )}
          </div>
        </div>

        {Object.keys(assignments).filter(x => assignments[x].deleted).length > 0 && (<>
          <div className="card mt-5">
            <div className="card-header">
              <button onClick={e => setShowDeleted(d => !d)} className="btn btn-link p-0 text-dark text-left btn-block">
                { showDeleted ? <FoldUpIcon size={16} /> : <FoldDownIcon size={16} /> }
                <span className="ml-2">
                  {showDeleted ? 'Hide' : 'Show' } deleted assignments
                </span>
              </button>
            </div>
            {showDeleted && (
              <div className="list-group list-group-flush">
                {Object.keys(assignments).filter(x => assignments[x].deleted).map(id => 
                  <Assignment key={id} assignment={assignments[id]} mark={mark} />
                )}
              </div>
            )}
          </div>
        </>)}

        <footer>
          <p className="text-center text-muted pt-4 mt-4 border-top" style={{ width: '50em', margin: '0 auto' }}>
            Easel (get it? becuase of canvas??) gets tasks from Canvas LMS
            using GraphQL, and uses Firestore to save the "done" and "deleted"
            states. Created for and by Ori Marash, please don't hack this,
            thanks :)
          </p>
        </footer>
      </div>
    </>
  )
}

export default Index
