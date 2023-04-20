import { FC, useEffect } from 'react'

import { Form } from 'antd'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

import { ErrorServerHandler } from '../../../../../../components'
import { useFormData } from '../../../../hooks'
import { UpdateUserNameType } from '../../../../hooks/use-authform/types'
import { StyledProfileParagraph } from '../../styles'

type ProfileNamePropsType = {
  userName: string
}

export const ProfileName: FC<ProfileNamePropsType> = ({ userName }) => {
  const [
    onSubmit,
    { handleSubmit, control, errors, setValue },
    { isLoading: isUpdating, error: updateUserNameError },
  ] = useFormData<UpdateUserNameType>('updateUserName')

  const customChangeUserNameHandleSubmit = async (
    value: string,
    field: ControllerRenderProps<FieldValues, 'name'>
  ) => {
    field.onBlur()
    field.onChange(value)
    handleSubmit(onSubmit)(value)
  }

  useEffect(() => setValue('name', userName), [])

  return (
    <>
      <Form.Item validateStatus={errors?.name?.message ? 'error' : ''} help={errors?.name?.message}>
        <Controller
          name={'name'}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <StyledProfileParagraph
                editable={{
                  onChange: value => customChangeUserNameHandleSubmit(value, field),
                }}
                disabled={isUpdating}
              >
                {field.value}
              </StyledProfileParagraph>
            </>
          )}
        />
      </Form.Item>

      <ErrorServerHandler error={updateUserNameError} />
    </>
  )
}
