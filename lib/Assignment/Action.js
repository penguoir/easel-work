import { CheckIcon, ArchiveIcon, ArrowUpIcon, XIcon } from '@primer/octicons-react'

function Action({ type, mark }) {
  switch (type) {
    case 'delete':
      return (
        <button onClick={e => mark('deleted')} className="btn btn-link text-danger py-0">
          <ArchiveIcon verticalAlign="text-top" size={16} aria-label="Delete this assignment" />
        </button>
      )
    case 'undelete':
      return (
        <button onClick={e => mark('not_deleted')} className="btn btn-link py-0">
          <ArrowUpIcon verticalAlign="text-top" size={16} /> Move back up
        </button>
      )
    case 'done':
      return (
        <button onClick={e => mark('done')} className="btn btn-link py-0">
          <CheckIcon verticalAlign="text-top" size={16} /> Mark as done
        </button>
      )
    case 'undone':
      return (
        <button onClick={e => mark('not_done')} className="btn btn-link text-dark py-0">
          <XIcon verticalAlign="text-top" size={16} /> Mark not done
        </button>
      )
    default:
      throw 'Not implemented'
  }
}

export default Action

