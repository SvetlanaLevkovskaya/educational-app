import { FC } from 'react'

import { Checkbox, Form } from 'antd'
import { Control, Controller } from 'react-hook-form'

type FormCheckboxPropsType = {
  name: 'rememberMe'
  control: Control<any>
}

//TODO type and type conflicts
export const FormCheckbox: FC<FormCheckboxPropsType> = ({ name, control }) => {
  return (
    <Form.Item
      name={name}
      valuePropName="checked"
      wrapperCol={{
        offset: 0,
        span: 16,
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value}>
            Remember me
          </Checkbox>
        )}
      />
    </Form.Item>
  )
}
