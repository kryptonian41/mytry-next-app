import type React from 'react'
import { useTheme } from 'utils/hooks/useTheme'
import { ErrorMessage, Field, type FieldAttributes } from 'formik'
import clsx from 'clsx'
import checkoutStyles from './checkout.module.scss'

interface InputFieldProps {
  containerProps?: { [key: string]: any }
  fieldProps: FieldAttributes<{}>
}

export const InputField: React.FunctionComponent<InputFieldProps> = ({
  fieldProps,
  containerProps,
}) => {
  const theme = useTheme()

  return (
    <div
      {...containerProps}
      className={clsx(
        checkoutStyles.inputFieldWrapper,
        containerProps?.className
      )}
    >
      <Field
        {...fieldProps}
        style={{
          borderColor: theme.green,
          ...fieldProps.style,
        }}
        className={clsx(
          'w-full bg-transparent pl-0 border-t-0 border-l-0 border-r-0 border border-b-2 focus:outline-none focus:ring-0',
          fieldProps.className
        )}
      />
      <div className="absolute bottom-0 left-0 text-red-900">
        <ErrorMessage component="span" name={fieldProps.name} />
      </div>
    </div>
  )
}
