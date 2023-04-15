import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form'

import { inputPropsByFieldName } from './constants'
import { FormInputProps } from './types'

export const FormInput = ({ name, control, rules, autoComplete, error }: FormInputProps) => {
  const { type, placeholder } = inputPropsByFieldName[name]

  return (
    <Form.Item validateStatus={error ? 'error' : ''} help={error?.message}>
      <>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) =>
            type === 'password' ? (
              <Input.Password {...field} placeholder={placeholder} autoComplete={autoComplete} />
            ) : (
              <Input {...field} placeholder={placeholder} autoComplete={autoComplete} />
            )
          }
        />
      </>
    </Form.Item>
  )
}
