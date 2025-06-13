import React from 'react'

const page = ({ params }: { params: { towerId: string; floorId: string } }) => {
  return (
    <div>{JSON.stringify(params)}</div>
  )
}

export default page