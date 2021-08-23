import { format, isValid } from 'date-fns'
import React, { useCallback, useMemo } from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { CellProps } from '.'
import styled from '../../../../../../shared/lib/styled'

const DateCell = ({ value, onUpdate }: CellProps) => {
  const date = useMemo(() => {
    const parsed = new Date(value)
    return isValid(parsed) ? parsed : null
  }, [value])

  const onChange: ReactDatePickerProps['onChange'] = useCallback(
    (date) => {
      if (date == null) {
        onUpdate('')
      } else if (Array.isArray(date)) {
        onUpdate(date[0].toISOString())
      } else {
        onUpdate(date.toISOString())
      }
    },
    [onUpdate]
  )

  return (
    <Container>
      <DatePicker
        selected={date}
        onChange={onChange}
        popperPlacement='top-end'
        customInput={
          <div>
            {date != null ? format(date, 'MMM dd, yyyy') : 'Click to add...'}
          </div>
        }
      />
    </Container>
  )
}

export default DateCell

const Container = styled.div`
  cursor: pointer;
`
