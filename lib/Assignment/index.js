import moment from 'moment'
import Course from '../course'
import Action from './Action'

function Assignment({ assignment, mark }) {
  const { id, name, dueAt, htmlUrl, course, deleted, done } = assignment

  let specialClass = " "
  if (done) {
    specialClass += "list-group-item-success"
  }

  const _mark = (type) => {
    mark(id, type)
  }

  return (
    <div className={"list-group-item d-flex justify-content-between" + specialClass }>
      <div>
        { done ? (<>
          {/* On one line when done */}
          <a href={htmlUrl} target="_blank" className="mb-0 text-body">
            {deleted && <span className="badge badge-light">Deleted</span>}{' '}
            {name}{' '}
            in <Course course={course} />, due {moment(dueAt).fromNow()}
          </a>
        </>) : (<>
          <a href={htmlUrl} target="_blank" className="mb-0 text-body font-weight-bold">
            {deleted && <span className="badge badge-light">Deleted</span>}{' '}
            {name}
          </a>
          <p className="mb-0">
            In <Course course={course} />, due {moment(dueAt).fromNow()}
          </p>
        </>)}
      </div>

      <div className="btn-group" role="group">
        {!done    && <Action type="done" mark={_mark} />}
        {done     && <Action type="undone" mark={_mark} />}
        {!deleted && <Action type="delete" mark={_mark} />}
        {deleted  && <Action type="undelete" mark={_mark} />}
      </div>
    </div>
  )

}

export default Assignment
