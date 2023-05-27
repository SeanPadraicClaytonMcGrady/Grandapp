import { Link } from 'react-router-dom'
import { EmotionalTask, PhysicalTask } from '../types'
import { FC, useState, useContext } from 'react'
import PopupMap from './PopUpMap'
import ExactLocation from './ExactLocation'
import { UserContext } from '../lib/userContext'

type TaskProps = {
  task: EmotionalTask | PhysicalTask
}

const TaskCard: FC<TaskProps> = ({ task }) => {
  const { user } = useContext(UserContext)

  const initialLocation = {
    lat: 51.505,
    lng: -0.09,
    name: 'London',
  }

  const locations = [
    {
      lat: 51.5,
      lng: -0.1,
      name: 'Location 1',
    },
    {
      lat: 51.51,
      lng: -0.08,
      name: 'Location 2',
    },
    {
      lat: 51.49,
      lng: -0.11,
      name: 'Location 3',
    },
  ]
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {user?.username}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {task.description}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <PopupMap
          initialLocation={{ lat: 51.5, lng: -0.1, name: 'Initial Location' }}
          address={task.location}
          locations={
            [
              // { lat: 51.51, lng: -0.09, name: 'Location A' },
              // { lat: 51.52, lng: -0.1, name: 'Location B' },
              // { lat: 51.49, lng: -0.08, name: 'Location C' },
            ]
          }
        />{' '}
        Location
      </td>
      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <ExactLocation address={task.location} />
      </td> */}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {task.scheduledDate}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {task.type}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Link
          to={`/tasks/${task.id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Apply <span className="sr-only">, {task.description}</span>
        </Link>
      </td>
    </tr>
  )
}

export default TaskCard
