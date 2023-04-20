import { Slider } from 'antd'

import { useCardPacksQuery } from '../../../../api'
import { StyledCardText } from '../../../../styles'

export const PacksSlider = () => {
  const { data } = useCardPacksQuery({})

  const minCount = data?.minCardsCount ?? 0
  const maxCount = data?.maxCardsCount ?? 110

  const onChange = (value: number | [number, number]) => {
    console.log('onChange: ', value)
  }

  const onAfterChange = (value: number | [number, number]) => {
    console.log('onAfterChange: ', value)
  }

  return (
    <div style={{ width: '25%', maxWidth: '370px', marginRight: '10px' }}>
      <StyledCardText>Number of cards</StyledCardText>
      <Slider
        max={maxCount}
        range={{ draggableTrack: true }}
        defaultValue={[minCount, maxCount]}
        step={1}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </div>
  )
}
