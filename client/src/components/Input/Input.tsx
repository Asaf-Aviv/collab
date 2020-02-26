import React from 'react'

type Props = {
  label: string
  value: string
  onChange: React.ChangeEventHandler
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
}

export const Input = ({ type }: Props) => (
  <div>
    <label />
    <input type={type || 'text'} />
  </div>
)
